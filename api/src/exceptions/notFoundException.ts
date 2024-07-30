import HttpException from "./httpException";

class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(404, message ?? "entity not found");
  }
}

export default NotFoundException;
