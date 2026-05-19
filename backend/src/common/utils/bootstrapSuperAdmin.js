import { User } from "../../modules/users/model/user.model.js";
import { ROLES } from "../constants/roles.js";
import { env } from "../../config/env.js";
import { hashPassword } from "./password.js";

export const bootstrapSuperAdmin = async () => {
  const hasSeedConfig = env.SUPER_ADMIN_NAME && env.SUPER_ADMIN_EMAIL && env.SUPER_ADMIN_PASSWORD;
  if (!hasSeedConfig) {
    return;
  }

  const existing = await User.findOne({ role: ROLES.SUPER_ADMIN });
  if (existing) {
    return;
  }

  const password = await hashPassword(env.SUPER_ADMIN_PASSWORD);
  await User.create({
    name: env.SUPER_ADMIN_NAME,
    email: env.SUPER_ADMIN_EMAIL,
    password,
    role: ROLES.SUPER_ADMIN,
    firstLoginRequired: false
  });
};

