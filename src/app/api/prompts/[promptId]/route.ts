import { AppError } from "@lib/api/appErrors";
import asyncHandler from "@lib/api/asyncHandler";
import connectDB from "@lib/api/connectDB";
import Prompt from "@models/promptModel";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

// Read

export const GET = asyncHandler(
  async (req: NextRequest, { params }: { params: { promptId: string } }) => {
    await connectDB();

    const prompt = await Prompt.findById(params.promptId).populate("user");

    if (!prompt) {
      throw new AppError("Prompt does not found", 404);
    }

    return NextResponse.json({ prompt });
  }
);

// Update
export const PATCH = asyncHandler(
  async (req: NextRequest, { params }: { params: { promptId: string } }) => {
    const newPrompt = await req.json();

    await connectDB();
    const prompt = await Prompt.findByIdAndUpdate(params.promptId, newPrompt, {
      new: true,
      runValidators: true,
    });

    if (!prompt) {
      throw new AppError("Prompt does not found", 404);
    }

    return NextResponse.json(
      {
        prompt,
      },
      { status: StatusCodes.OK }
    );
  }
);

// Delete
export const DELETE = asyncHandler(
  async (req: NextRequest, { params }: { params: { promptId: string } }) => {
    await connectDB();
    await Prompt.findByIdAndDelete(params.promptId);
    return NextResponse.json(
      {
        message: "The prompt has been deleted successfully",
      },
      { status: StatusCodes.OK }
    );
  }
);
