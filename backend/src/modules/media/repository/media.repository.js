import { Media } from "../model/media.model.js";

export const mediaRepository = {
  create: (payload) => Media.create(payload),
  findById: (id) => Media.findById(id)
};

