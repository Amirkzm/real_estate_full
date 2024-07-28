import HttpException from "./httpException";

class PageNotFoundException extends HttpException {
  constructor() {
    super(404, "Page not found");
  }
}

export default PageNotFoundException;
