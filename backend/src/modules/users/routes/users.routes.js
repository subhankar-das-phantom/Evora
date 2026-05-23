import { Router } from "express";
import { protect } from "../../../common/middlewares/auth.js";
import { validateRequest } from "../../../common/middlewares/validateRequest.js";
import { imageUpload } from "../../../common/middlewares/upload.js";
import { getMyProfile, updateMyAvatar, updateMyProfile, saveEvent, unsaveEvent, getSavedEvents } from "../controller/users.controller.js";
import { emptyQuerySchema, updateProfileSchema, eventIdParamSchema } from "../validation/users.validation.js";

const usersRouter = Router();

usersRouter.get("/me", protect, validateRequest(emptyQuerySchema), getMyProfile);
usersRouter.patch("/me", protect, validateRequest(updateProfileSchema), updateMyProfile);
usersRouter.patch(
  "/me/avatar",
  protect,
  validateRequest(emptyQuerySchema),
  imageUpload.single("avatar"),
  updateMyAvatar
);

usersRouter.get("/me/saved-events", protect, validateRequest(emptyQuerySchema), getSavedEvents);
usersRouter.post("/me/saved-events/:eventId", protect, validateRequest(eventIdParamSchema), saveEvent);
usersRouter.delete("/me/saved-events/:eventId", protect, validateRequest(eventIdParamSchema), unsaveEvent);

export default usersRouter;

