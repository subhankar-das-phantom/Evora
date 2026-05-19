import { User } from "../model/user.model.js";

export const usersRepository = {
  create: (payload) => User.create(payload),
  findByEmail: (email) => User.findOne({ email }),
  findById: (id) => User.findById(id),
  findByIdAndUpdate: (id, payload) => User.findByIdAndUpdate(id, payload, { new: true }),
  countByRole: (role) => User.countDocuments({ role })
};

