import mongoose from "mongoose";

const ConferenceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      //   unique: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Conference = mongoose.model("Conference", ConferenceSchema);
