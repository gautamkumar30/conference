import mongoose, { Schema } from "mongoose";

// Attributes: Title, Date, Venue, Description, PostedDate, Organizers, RegistrationAmount, Theme, Chairpersons, Speakers (optional), Papers

const ConferenceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    registrationAmount: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },

    // Chairpersons, papers
  },
  { timestamps: true }
);

export const Conference = mongoose.model("Conference", ConferenceSchema);
