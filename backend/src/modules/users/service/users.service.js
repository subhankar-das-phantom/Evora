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
  },

  async saveEvent(userId, eventId) {
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const alreadySaved = user.savedEvents.some(
      (id) => id.toString() === eventId
    );
    if (alreadySaved) {
      throw new AppError("Event is already saved", 409);
    }
    user.savedEvents.push(eventId);
    await user.save();
    return { savedEvents: user.savedEvents };
  },

  async unsaveEvent(userId, eventId) {
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const idx = user.savedEvents.findIndex(
      (id) => id.toString() === eventId
    );
    if (idx === -1) {
      throw new AppError("Event is not in saved list", 404);
    }
    user.savedEvents.splice(idx, 1);
    await user.save();
    return { savedEvents: user.savedEvents };
  },

  async getSavedEvents(userId) {
    const user = await usersRepository
      .findById(userId)
      .select("savedEvents")
      .populate({
        path: "savedEvents",
        select: "title category venue startDate endDate maxSeats bookedSeats banner status slug"
      });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user.savedEvents;
  }
};

