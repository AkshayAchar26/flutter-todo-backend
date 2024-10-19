import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userId: { type: String, unique: true, required: [true, "can't be blank"] },
    email : { type: String, unique: true, required: [true, "can't be blank"] },
  },
  {
    timestamps: true,
  }
);


export const User = mongoose.model("User", userSchema);
