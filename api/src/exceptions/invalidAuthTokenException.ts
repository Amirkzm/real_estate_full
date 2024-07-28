import HttpException from "./httpException";

class invalidAuthTokenException extends HttpException {
  constructor() {
    super(401, "Wrong authentication token");
  }
}

export default invalidAuthTokenException;
