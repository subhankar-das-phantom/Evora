import { AppError } from "../../../common/errors/AppError.js";
import { EVENT_STATUS } from "../../../common/constants/eventStatus.js";
import { slugifyText } from "../../../common/utils/slug.js";
import { getPagination } from "../../../common/utils/pagination.js";
import { eventsRepository } from "../repository/events.repository.js";
import { mediaService } from "../../media/service/media.service.js";

const ensureUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = slugifyText(title);
  let slug = baseSlug || "event";
  let suffix = 1;

  while (true) {
    const filter = { slug };
    if (excludeId) {
      filter._id = { $ne: excludeId };
    }
    const found = await eventsRepository.findOne(filter);
    if (!found) return slug;
    slug = `${baseSlug}-${suffix++}`;
  }
};

const buildListFilters = (query) => {
  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.status) filter.status = query.status;
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
      { venue: { $regex: query.search, $options: "i" } }
    ];
  }
  return filter;
};

const getSortOption = (sortBy, sortOrder) => {
  const safeSortBy = ["startDate", "createdAt", "maxSeats", "bookedSeats"].includes(sortBy) ? sortBy : "startDate";
  const safeSortOrder = sortOrder === "desc" ? -1 : 1;
  return { [safeSortBy]: safeSortOrder };
};

export const eventsService = {
  async createEvent(userId, payload) {
    if (new Date(payload.endDate) < new Date(payload.startDate)) {
      throw new AppError("endDate must be greater than or equal to startDate", 400);
    }

    const slug = await ensureUniqueSlug(payload.title);
    return eventsRepository.create({
      ...payload,
      slug,
      createdBy: userId
    });
  },

  async updateEvent(eventId, payload) {
    const event = await eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError("Event not found", 404);
    }

    if (payload.startDate || payload.endDate) {
      const startDate = payload.startDate ? new Date(payload.startDate) : event.startDate;
      const endDate = payload.endDate ? new Date(payload.endDate) : event.endDate;
      if (endDate < startDate) {
        throw new AppError("endDate must be greater than or equal to startDate", 400);
      }
    }

    if (typeof payload.maxSeats === "number" && payload.maxSeats < event.bookedSeats) {
      throw new AppError("maxSeats cannot be less than bookedSeats", 400);
    }

    if (payload.title && payload.title !== event.title) {
      payload.slug = await ensureUniqueSlug(payload.title, eventId);
    }

    return eventsRepository.findByIdAndUpdate(eventId, payload);
  },

  async deleteEvent(eventId) {
    const deleted = await eventsRepository.findByIdAndDelete(eventId);
    if (!deleted) {
      throw new AppError("Event not found", 404);
    }
  },

  async updateEventStatus(eventId, status) {
    const event = await eventsRepository.findByIdAndUpdate(eventId, { status });
    if (!event) {
      throw new AppError("Event not found", 404);
    }
    return event;
  },

  async uploadEventBanner(eventId, buffer) {
    const event = await eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError("Event not found", 404);
    }

    const optimized = await mediaService.optimizeImage(buffer, {
      width: 1440,
      quality: 72
    });

    return eventsRepository.findByIdAndUpdate(eventId, {
      banner: optimized.dataUri
    });
  },

  async getEventById(eventId) {
    const event = await eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError("Event not found", 404);
    }
    return event;
  },

  async listPublicEvents(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = buildListFilters(query);
    filter.status = query.status || EVENT_STATUS.PUBLISHED;
    if (!query.status || query.status === EVENT_STATUS.PUBLISHED) {
      filter.endDate = { $gte: new Date() };
    }

    const sort = getSortOption(query.sortBy, query.sortOrder);

    const [events, total] = await Promise.all([
      eventsRepository.find(filter, { sort, skip, limit }),
      eventsRepository.countDocuments(filter)
    ]);

    return {
      items: events,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  async listAdminEvents(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = buildListFilters(query);
    if (query.status) {
      filter.status = query.status;
    }

    const sort = getSortOption(query.sortBy, query.sortOrder);

    const [events, total] = await Promise.all([
      eventsRepository.find(filter, { sort, skip, limit }),
      eventsRepository.countDocuments(filter)
    ]);

    return {
      items: events,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
};
