import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
