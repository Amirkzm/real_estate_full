import HttpException from "./httpException";

class InternalException extends HttpException {
  constructor() {
    super(500, "Internal error occurred. Please try again later.");
  }
}

export default InternalException;
