import QRCode from "qrcode";
import { AppError } from "../../../common/errors/AppError.js";
import { EVENT_STATUS } from "../../../common/constants/eventStatus.js";
import { BOOKING_STATUS } from "../../../common/constants/bookingStatus.js";
import { eventsRepository } from "../../events/repository/events.repository.js";
import { bookingsRepository } from "../repository/bookings.repository.js";

const generateTicketQrCode = async (bookingPayload) => {
  return QRCode.toDataURL(JSON.stringify(bookingPayload), {
    errorCorrectionLevel: "M",
    type: "image/png",
    margin: 1,
    width: 280
  });
};

export const bookingsService = {
  async createBooking(userId, eventId) {
    const existingBooking = await bookingsRepository.findOne({
      userId,
      eventId,
      bookingStatus: { $ne: BOOKING_STATUS.CANCELLED }
    });

    if (existingBooking) {
      throw new AppError("You have already booked this event", 409);
    }

    const event = await eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError("Event not found", 404);
    }
    if (event.status !== EVENT_STATUS.PUBLISHED) {
      throw new AppError("This event is not published for booking yet", 400);
    }
    if (new Date(event.endDate) < new Date()) {
      throw new AppError("This event has already ended", 400);
    }
    if (event.bookedSeats >= event.maxSeats) {
      throw new AppError("This event is sold out", 400);
    }

    const reservedEvent = await eventsRepository.findOneAndUpdate(
      {
        _id: eventId,
        status: EVENT_STATUS.PUBLISHED,
        endDate: { $gte: new Date() },
        $expr: { $lt: ["$bookedSeats", "$maxSeats"] }
      },
      { $inc: { bookedSeats: 1 } },
      { new: true }
    );

    if (!reservedEvent) {
      throw new AppError("Tickets just sold out. Please try another event", 400);
    }

    const ticketPayload = {
      userId,
      eventId,
      timestamp: Date.now()
    };
    const qrCode = await generateTicketQrCode(ticketPayload);

    try {
      return await bookingsRepository.create({
        userId,
        eventId,
        qrCode
      });
    } catch (error) {
      await eventsRepository.findByIdAndUpdate(eventId, { $inc: { bookedSeats: -1 } });
      if (error.code === 11000) {
        throw new AppError("You have already booked this event", 409);
      }
      throw error;
    }
  },

  async getMyBookings(userId) {
    return bookingsRepository.find({ userId }).populate("eventId");
  },

  async checkInBooking(bookingId) {
    const booking = await bookingsRepository.findByIdAndUpdate(bookingId, { checkedIn: true });
    if (!booking) {
      throw new AppError("Booking not found", 404);
    }
    return booking;
  },

  async listEventBookings(eventId) {
    return bookingsRepository.find({ eventId }).populate("userId", "name email");
  },

  async listAllBookings() {
    return bookingsRepository.find({})
      .populate("eventId", "title date")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
  }
};
