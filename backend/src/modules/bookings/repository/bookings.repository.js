import { Booking } from "../model/booking.model.js";

export const bookingsRepository = {
  create: (payload) => Booking.create(payload),
  findOne: (filter) => Booking.findOne(filter),
  find: (filter) => Booking.find(filter),
  findByIdAndUpdate: (id, payload) => Booking.findByIdAndUpdate(id, payload, { new: true }),
  countDocuments: (filter) => Booking.countDocuments(filter)
};

