import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { sendSuccess } from "../../../common/utils/response.js";
import { usersService } from "../service/users.service.js";
import { mediaService } from "../../media/service/media.service.js";
import { AppError } from "../../../common/errors/AppError.js";

export const getMyProfile = asyncHandler(async (req, res) => {
  const user = await usersService.getMyProfile(req.user.userId);
  return sendSuccess(res, "Profile fetched successfully", user);
});

export const updateMyProfile = asyncHandler(async (req, res) => {
  const user = await usersService.updateMyProfile(req.user.userId, req.body);
  return sendSuccess(res, "Profile updated successfully", user);
});

export const updateMyAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Avatar image is required", 400);
  }

  const optimized = await mediaService.optimizeImage(req.file.buffer, { width: 480, quality: 72 });
  const user = await usersService.updateAvatar(req.user.userId, optimized.dataUri);
  return sendSuccess(res, "Avatar updated successfully", user);
});

