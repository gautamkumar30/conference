// Attributes: AuthorId, Title, PaperLink, TotalRating, Ratings (array with chairpersonId-rating pairs)

import mongoose, { Schema } from "mongoose";

const PaperSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conferenceId: {
    type: String,
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
  Ratings: {
    type: String,
  },
});

export const Paper = mongoose.model("Paper", PaperSchema);
