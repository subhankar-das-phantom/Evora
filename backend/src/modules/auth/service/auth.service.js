import { AppError } from "../../../common/errors/AppError.js";
import { ROLES } from "../../../common/constants/roles.js";
import { comparePassword, hashPassword } from "../../../common/utils/password.js";
import { signToken } from "../../../common/utils/jwt.js";
import { authRepository } from "../repository/auth.repository.js";

const buildAuthPayload = (user) => ({
  token: signToken({ userId: user._id.toString(), role: user.role }),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    firstLoginRequired: user.firstLoginRequired
  }
});

export const authService = {
  async register(payload) {
    const existingUser = await authRepository.findByEmail(payload.email);
    if (existingUser) {
      throw new AppError("Email already in use", 409);
    }

    const hashedPassword = await hashPassword(payload.password);
    const user = await authRepository.createUser({
      ...payload,
      password: hashedPassword,
      role: ROLES.USER
    });
    return buildAuthPayload(user);
  },

  async login(payload) {
    const user = await authRepository.findByEmail(payload.email);
    if (!user || !user.isActive) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await comparePassword(payload.password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    return buildAuthPayload(user);
  },

  async changeFirstLoginPassword(userId, newPassword) {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.role !== ROLES.ADMIN) {
      throw new AppError("This flow is only applicable for admin accounts", 400);
    }

    const hashedPassword = await hashPassword(newPassword);
    await authRepository.findByIdAndUpdate(userId, {
      password: hashedPassword,
      firstLoginRequired: false
    });
  }
};

