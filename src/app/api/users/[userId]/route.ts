import { AppError } from "@lib/api/appErrors";
import asyncHandler from "@lib/api/asyncHandler";
import connectDB from "@lib/api/connectDB";
import User from "@models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
  async (req: NextRequest, { params }: { params: { userId: string } }) => {
    await connectDB();

    const user = await User.findById(params.userId);

    if (!user) {
      throw new AppError("User does not found", 404);
    }

    return NextResponse.json({ user });
  }
);
