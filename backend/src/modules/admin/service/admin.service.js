import { AppError } from "../../../common/errors/AppError.js";
import { hashPassword } from "../../../common/utils/password.js";
import { ROLES } from "../../../common/constants/roles.js";
import { adminRepository } from "../repository/admin.repository.js";

export const adminService = {
  async createAdmin(createdByUserId, payload) {
    const existing = await adminRepository.findAnyUserByEmail(payload.email);
    if (existing) {
      throw new AppError("Email already in use", 409);
    }

    const hashedPassword = await hashPassword(payload.password);
    const admin = await adminRepository.createAdmin({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: ROLES.ADMIN,
      firstLoginRequired: true,
      createdBy: createdByUserId
    });

    const adminObject = admin.toObject();
    delete adminObject.password;
    return adminObject;
  },

  async disableAdmin(adminId) {
    const admin = await adminRepository.findAdminById(adminId);
    if (!admin) {
      throw new AppError("Admin not found", 404);
    }

    admin.isActive = false;
    await admin.save();

    const output = admin.toObject();
    delete output.password;
    return output;
  },

  async listAdmins() {
    return adminRepository.listAdmins();
  },

  async getAnalytics() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const [
      users, events, bookings,
      currentUsers, currentEvents, currentBookings,
      prevUsers, prevEvents, prevBookings
    ] = await Promise.all([
      // Total counts
      adminRepository.countUsers(),
      adminRepository.countEvents(),
      adminRepository.countBookings(),
      // Current 30 days
      adminRepository.countUsers(thirtyDaysAgo, now),
      adminRepository.countEvents(thirtyDaysAgo, now),
      adminRepository.countBookings(thirtyDaysAgo, now),
      // Previous 30 days
      adminRepository.countUsers(sixtyDaysAgo, thirtyDaysAgo),
      adminRepository.countEvents(sixtyDaysAgo, thirtyDaysAgo),
      adminRepository.countBookings(sixtyDaysAgo, thirtyDaysAgo)
    ]);

    const calculateTrend = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    return {
      users,
      events,
      bookings,
      usersTrend: calculateTrend(currentUsers, prevUsers),
      eventsTrend: calculateTrend(currentEvents, prevEvents),
      bookingsTrend: calculateTrend(currentBookings, prevBookings)
    };
  }
};
