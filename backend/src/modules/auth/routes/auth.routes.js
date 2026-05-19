import { Router } from "express";
import { validateRequest } from "../../../common/middlewares/validateRequest.js";
import { protect } from "../../../common/middlewares/auth.js";
import { changeFirstLoginPassword, login, register } from "../controller/auth.controller.js";
import { firstLoginPasswordSchema, loginSchema, registerSchema } from "../validation/auth.validation.js";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), register);
authRouter.post("/login", validateRequest(loginSchema), login);
authRouter.post(
  "/change-password-first-login",
  protect,
  validateRequest(firstLoginPasswordSchema),
  changeFirstLoginPassword
);

export default authRouter;

