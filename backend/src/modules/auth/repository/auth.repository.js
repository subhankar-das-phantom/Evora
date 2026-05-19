import { User } from "../../users/model/user.model.js";

export const authRepository = {
  createUser: (payload) => User.create(payload),
  findByEmail: (email) => User.findOne({ email }),
  findById: (id) => User.findById(id),
  findByIdAndUpdate: (id, payload) => User.findByIdAndUpdate(id, payload, { new: true })
};

