class ApiError extends Error {
  constructor(status, type, title, message, subErrors) {
    super(message);
    this.status = status;
    this.type = type;
    this.title = title;
    this.message = message;
    this.subErrors = subErrors;
  }
}

export default ApiError;
