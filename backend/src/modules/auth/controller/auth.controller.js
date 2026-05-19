import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { sendSuccess } from "../../../common/utils/response.js";
import { authService } from "../service/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  return sendSuccess(res, "User registered successfully", data, 201);
});

export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  return sendSuccess(res, "Login successful", data);
});

export const changeFirstLoginPassword = asyncHandler(async (req, res) => {
  await authService.changeFirstLoginPassword(req.user.userId, req.body.newPassword);
  return sendSuccess(res, "Password changed successfully");
});

