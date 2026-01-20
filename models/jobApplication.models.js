import mongoose from "mongoose";

const newJobApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      filename: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
    coverLetter: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const NewJobApplication = mongoose.model("NewJobApplication", newJobApplicationSchema);

export default NewJobApplication;