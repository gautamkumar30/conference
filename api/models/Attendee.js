// - Attributes: UserId, ConferenceId

import mongoose, { Mongoose, Schema } from "mongoose";

const AttendeeSchema = Schema( 
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    conferenceId: {
      type: Schema.Types.ObjectId,
      ref: "Conference", 
    },
  },
  { timestamps: true }
);

export const Attendee = mongoose.model("Attendee", AttendeeSchema);
