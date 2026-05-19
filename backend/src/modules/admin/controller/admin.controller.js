import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { sendSuccess } from "../../../common/utils/response.js";
import { adminService } from "../service/admin.service.js";

export const createAdmin = asyncHandler(async (req, res) => {
  const admin = await adminService.createAdmin(req.user.userId, req.body);
  return sendSuccess(res, "Admin created successfully", admin, 201);
});

export const disableAdmin = asyncHandler(async (req, res) => {
  const admin = await adminService.disableAdmin(req.params.adminId);
  return sendSuccess(res, "Admin disabled successfully", admin);
});

export const listAdmins = asyncHandler(async (_req, res) => {
  const admins = await adminService.listAdmins();
  return sendSuccess(res, "Admins fetched successfully", admins);
});

export const getAnalytics = asyncHandler(async (_req, res) => {
  const analytics = await adminService.getAnalytics();
  return sendSuccess(res, "Analytics fetched successfully", analytics);
});

