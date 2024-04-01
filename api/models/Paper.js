// Attributes: AuthorId, Title, PaperLink, TotalRating, Ratings (array with chairpersonId-rating pairs)

import mongoose, { Schema } from "mongoose";

const PaperSchema = mongoose.Schema({
  authorId: {
    type: String,
  },
  title: {
    type: String,
  },
  paperLink: {
    type: String,
  },
  totalRating: {
    type: String,
  },
  Ratings: {
    type: String,
  },
});

export const Paper = mongoose.model("Paper", PaperSchema);
