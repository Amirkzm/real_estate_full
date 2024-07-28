import { ZodError } from "zod";
import HttpException from "../exceptions/httpException";
import InternalException from "../exceptions/internalException";

export const errorHandler = (func: Function) => {
  return async (req: any, res: any, next: any) => {
    try {
      await func(req, res);
    } catch (error) {
      let exception: HttpException | ZodError;
      if (error instanceof HttpException || error instanceof ZodError) {
        exception = error;
      } else {
        console.log("error", error);
        exception = new InternalException();
      }

      next(exception);
    }
  };
};
