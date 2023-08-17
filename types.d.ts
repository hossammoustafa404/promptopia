import mongoose from "mongoose";

interface Prompt {
  content: string;
  category: string;
  user: mongoose.Types.ObjectId;
}
