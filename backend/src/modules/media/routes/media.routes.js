import { Router } from "express";
import { protect } from "../../../common/middlewares/auth.js";
import { validateRequest } from "../../../common/middlewares/validateRequest.js";
import { imageUpload } from "../../../common/middlewares/upload.js";
import { uploadMedia } from "../controller/media.controller.js";
import { uploadMediaSchema } from "../validation/media.validation.js";

const mediaRouter = Router();

mediaRouter.post(
  "/upload",
  protect,
  validateRequest(uploadMediaSchema),
  imageUpload.single("image"),
  uploadMedia
);

export default mediaRouter;

