import { NextRequest, NextResponse } from "next/server";
import { Prompt as PromptType } from "../../../../types";
import connectDB from "@lib/api/connectDB";
import Prompt from "@models/promptModel";
import { promptSchema } from "@lib/api/validators/prompts";
import validate from "@lib/api/validate";
import asyncHandler from "@lib/api/asyncHandler";

export const POST = asyncHandler(async (req: NextRequest) => {
  const prompt: PromptType = (await req.json()) as PromptType;

  validate(prompt, promptSchema);

  await connectDB();

  const newPrompt = await Prompt.create(prompt);

  return NextResponse.json({ prompt: newPrompt });
});

export const GET = asyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const content = searchParams.get("content");
  const category = searchParams.get("category");

  let queryObj: any = {};

  if (content) {
    queryObj.content = content;
  }
  if (category) {
    queryObj.category = category;
  }

  await connectDB();

  console.log(queryObj);

  const prompts = await Prompt.find(queryObj).populate("user");

  return NextResponse.json({ prompts });
});

// For Test
export const DELETE = asyncHandler(async () => {
  await connectDB();

  await Prompt.deleteMany();

  return NextResponse.json({});
});
