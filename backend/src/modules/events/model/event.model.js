import mongoose from "mongoose";
import { EVENT_STATUS, EVENT_STATUS_VALUES } from "../../../common/constants/eventStatus.js";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    venue: {
      type: String,
      required: true,
      trim: true
    },
    banner: {
      type: String,
      default: null
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    maxSeats: {
      type: Number,
      required: true,
      min: 1
    },
    bookedSeats: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: EVENT_STATUS_VALUES,
      default: EVENT_STATUS.DRAFT
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

eventSchema.index({ title: "text", description: "text", category: "text", venue: "text" });
eventSchema.index({ startDate: 1, status: 1 });

export const Event = mongoose.model("Event", eventSchema);

