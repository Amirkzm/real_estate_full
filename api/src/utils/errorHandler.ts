import { ZodError } from "zod";
import HttpException from "../exceptions/httpException";
import InternalException from "../exceptions/internalException";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorHandler = (func: Function) => {
  return async (req: any, res: any, next: any) => {
    try {
      await func(req, res);
    } catch (error) {
      let exception:
        | HttpException
        | ZodError
        | Error
        | PrismaClientKnownRequestError;
      if (error instanceof HttpException || error instanceof ZodError) {
        exception = error;
      } else {
        console.log("internar error details::", error);
        exception = new InternalException();
      }

      next(exception);
    }
  };
};
