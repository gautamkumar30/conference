import mongoose from "mongoose";

const PersonSchema = mongoose.Schema(
  {
    college: {
      type: String,
      required: true,
      //   unique: true,
    },
    university: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Person = mongoose.model("Person", PersonSchema);
