import BaseError from "./BaseError";

class ApiError extends BaseError {
  constructor(type, status, title, message, subErrors) {
    super(type, title, message);
    this.status = status;
    this.subErrors = subErrors;
  }
}

export default ApiError;
