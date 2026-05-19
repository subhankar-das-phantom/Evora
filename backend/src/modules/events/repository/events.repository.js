import { Event } from "../model/event.model.js";

export const eventsRepository = {
  create: (payload) => Event.create(payload),
  findById: (id) => Event.findById(id),
  findOne: (filter) => Event.findOne(filter),
  findOneAndUpdate: (filter, payload, options = { new: true }) => Event.findOneAndUpdate(filter, payload, options),
  findByIdAndUpdate: (id, payload) => Event.findByIdAndUpdate(id, payload, { new: true }),
  findByIdAndDelete: (id) => Event.findByIdAndDelete(id),
  countDocuments: (filter) => Event.countDocuments(filter),
  find: (filter, options = {}) => {
    let query = Event.find(filter);
    if (options.sort) query = query.sort(options.sort);
    if (typeof options.skip === "number") query = query.skip(options.skip);
    if (typeof options.limit === "number") query = query.limit(options.limit);
    return query;
  }
};
