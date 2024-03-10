import BaseError from "./BaseError";

class ApiError extends BaseError {
  constructor(type, title, message, status, subErrors) {
    super(message);
    this.type = type;
    this.title = title;
    this.status = status;
    this.subErrors = subErrors;
  }
}

export default ApiError;
