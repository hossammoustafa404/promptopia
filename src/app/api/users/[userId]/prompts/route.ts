import asyncHandler from "@lib/api/asyncHandler";
import connectDB from "@lib/api/connectDB";
import Prompt from "@models/promptModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
  async (
    req: NextRequest,
    { params: { userId } }: { params: { userId: string } }
  ) => {
    console.log(userId);

    await connectDB();

    const prompts = await Prompt.find({ user: userId }).populate("user");

    return NextResponse.json({ prompts });
  }
);
