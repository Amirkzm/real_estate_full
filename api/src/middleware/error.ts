import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";
import { ZodError } from "zod";

export const errorMiddleWare = (
  err: HttpException | Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("________________start of error middleware________________");
  console.log(err);
  if (err instanceof HttpException) {
    res.status(err.status).json({
      status: "error",
      errors: {
        code: err.status,
        message: err.message,
        details: err.details || undefined,
      },
    });
  } else if (err instanceof ZodError) {
    res.status(400).json({
      status: "error",
      errors: {
        code: 400,
        message: "Validation error",
        details: err.errors,
      },
    });
  } else {
    res.status(500).json({
      status: "error",
      errors: {
        code: 500,
        message: err,
      },
    });
  }
};
