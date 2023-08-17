import { Schema, model, models, Types } from "mongoose";

const promptSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      lowercase: true,
    },

    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
