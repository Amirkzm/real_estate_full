import HttpException from "./httpException";

class invalidCredentialsException extends HttpException {
  constructor() {
    super(401, "Wrong credentials provided");
  }
}

export default invalidCredentialsException;
