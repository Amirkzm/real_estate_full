import HttpException from "./httpException";

class BadRequestException extends HttpException {
  public details?: any;
  constructor(message: string, details?: any) {
    super(400, message);
    this.details = details;
  }
}

export default BadRequestException;
