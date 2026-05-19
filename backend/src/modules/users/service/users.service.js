import { AppError } from "../../../common/errors/AppError.js";
import { usersRepository } from "../repository/users.repository.js";

export const usersService = {
  async getMyProfile(userId) {
    const user = await usersRepository.findById(userId).select("-password");
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  },

  async updateMyProfile(userId, payload) {
    const user = await usersRepository.findByIdAndUpdate(userId, payload);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return usersRepository.findById(user._id).select("-password");
  },

  async updateAvatar(userId, avatarDataUri) {
    const user = await usersRepository.findByIdAndUpdate(userId, { avatar: avatarDataUri });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return usersRepository.findById(user._id).select("-password");
  }
};

