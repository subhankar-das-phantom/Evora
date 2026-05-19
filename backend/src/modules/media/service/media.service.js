import sharp from "sharp";
import { AppError } from "../../../common/errors/AppError.js";
import { mediaRepository } from "../repository/media.repository.js";

export const mediaService = {
  async optimizeImage(buffer, options = {}) {
    if (!buffer) {
      throw new AppError("Image file is required", 400);
    }

    const width = options.width || 1280;
    const quality = options.quality || 70;
    const format = options.format || "webp";

    const transformer = sharp(buffer).rotate().resize({
      width,
      withoutEnlargement: true,
      fit: "inside"
    });

    const { data, info } =
      format === "jpeg"
        ? await transformer.jpeg({ quality, mozjpeg: true }).toBuffer({ resolveWithObject: true })
        : await transformer.webp({ quality }).toBuffer({ resolveWithObject: true });

    return {
      mimeType: format === "jpeg" ? "image/jpeg" : "image/webp",
      dataUri: `data:${format === "jpeg" ? "image/jpeg" : "image/webp"};base64,${data.toString("base64")}`,
      sizeKB: Number((info.size / 1024).toFixed(2)),
      width: info.width,
      height: info.height
    };
  },

  async storeOptimizedImage(ownerId, moduleName, optimizedImage) {
    return mediaRepository.create({
      ownerId,
      module: moduleName || "generic",
      mimeType: optimizedImage.mimeType,
      data: optimizedImage.dataUri,
      sizeKB: optimizedImage.sizeKB,
      width: optimizedImage.width,
      height: optimizedImage.height
    });
  }
};

