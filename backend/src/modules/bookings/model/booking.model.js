import mongoose from "mongoose";
import { BOOKING_STATUS, BOOKING_STATUS_VALUES } from "../../../common/constants/bookingStatus.js";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    qrCode: {
      type: String,
      required: true
    },
    bookingStatus: {
      type: String,
      enum: BOOKING_STATUS_VALUES,
      default: BOOKING_STATUS.BOOKED
    },
    checkedIn: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

bookingSchema.index({ userId: 1, eventId: 1 }, { unique: true });
bookingSchema.index({ eventId: 1, createdAt: -1 });

export const Booking = mongoose.model("Booking", bookingSchema);

