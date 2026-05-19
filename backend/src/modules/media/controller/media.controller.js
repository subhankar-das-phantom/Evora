import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { sendSuccess } from "../../../common/utils/response.js";
import { AppError } from "../../../common/errors/AppError.js";
import { mediaService } from "../service/media.service.js";

export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Image file is required", 400);
  }

  const optimized = await mediaService.optimizeImage(req.file.buffer, {
    width: 1280,
    quality: 72
  });
  const media = await mediaService.storeOptimizedImage(req.user.userId, req.query.module, optimized);

  return sendSuccess(res, "Image uploaded successfully", media, 201);
});

