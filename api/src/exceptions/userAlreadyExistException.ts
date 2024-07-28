import HttpException from "./httpException";

class UserAlreadyExistException extends HttpException {
  constructor(email: string) {
    super(409, `User with email ${email} already exists`);
  }
}

export default UserAlreadyExistException;
