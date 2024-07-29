import HttpException from "./httpException";

class InternalException extends HttpException {
  constructor(message?: string) {
    super(500, message ?? "Internal error occurred. Please try again later.");
  }
}

export default InternalException;
