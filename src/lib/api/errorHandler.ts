import { NextResponse } from "next/server";

const errorHandler = (err: any) => {
  // Need to handle mongodb errors
  const errObj = {
    statusCode: err.statusCode || 500,
    status: err.status || "error",
    message: err.message || "Something went wrong",
    stack: err.stack,
  };

  if (process.env.NODE_ENV === "development") {
    return NextResponse.json(
      { status: errObj.status, message: err.message, stack: errObj.stack },
      { status: errObj.statusCode }
    );
  } else if (process.env.NODE_ENV === "production") {
    if (!err?.isOperational) {
      return NextResponse.json(
        { status: "error", message: "Something Went Wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { status: errObj.status, message: err.message },
      { status: errObj.statusCode }
    );
  }
};

export default errorHandler;
