import { NextFunction, Response, Request } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
):any => {
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .json({ status: error.statusCode, message: error.message });
  } else {
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
