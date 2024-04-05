// Attributes: AuthorId, Title, PaperLink, TotalRating, Ratings (array with chairpersonId-rating pairs)

import mongoose, { Schema } from "mongoose";

const PaperSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conferenceId: {
    type: Schema.Types.ObjectId,
    ref: "Conference",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  totalRaters: {
    type: Number,
    default: 0,
  },
});

export const Paper = mongoose.model("Paper", PaperSchema);
