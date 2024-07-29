import HttpException from "./httpException";

class MissedAuthTokenException extends HttpException {
  constructor() {
    super(401, "Authorization token is missed");
  }
}

export default MissedAuthTokenException;
