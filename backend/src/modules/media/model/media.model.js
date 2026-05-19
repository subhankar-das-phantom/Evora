import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    module: {
      type: String,
      enum: ["avatar", "event-banner", "generic"],
      default: "generic"
    },
    mimeType: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: true
    },
    sizeKB: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const Media = mongoose.model("Media", mediaSchema);

