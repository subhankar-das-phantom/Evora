import { User } from "../../users/model/user.model.js";
import { Event } from "../../events/model/event.model.js";
import { Booking } from "../../bookings/model/booking.model.js";
import { ROLES } from "../../../common/constants/roles.js";

export const adminRepository = {
  createAdmin: (payload) => User.create(payload),
  findAnyUserByEmail: (email) => User.findOne({ email }),
  findAdminByEmail: (email) => User.findOne({ email, role: ROLES.ADMIN }),
  findAdminById: (id) => User.findOne({ _id: id, role: ROLES.ADMIN }),
  updateAdminById: (id, payload) => User.findByIdAndUpdate(id, payload, { new: true }),
  listAdmins: () => User.find({ role: ROLES.ADMIN }).select("-password"),
  countUsers: (startDate, endDate) => {
    const query = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = startDate;
      if (endDate) query.createdAt.$lt = endDate;
    }
    return User.countDocuments(query);
  },
  countEvents: (startDate, endDate) => {
    const query = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = startDate;
      if (endDate) query.createdAt.$lt = endDate;
    }
    return Event.countDocuments(query);
  },
  countBookings: (startDate, endDate) => {
    const query = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = startDate;
      if (endDate) query.createdAt.$lt = endDate;
    }
    return Booking.countDocuments(query);
  }
};
