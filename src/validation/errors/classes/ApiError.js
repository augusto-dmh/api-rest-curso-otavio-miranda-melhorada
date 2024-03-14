class ApiError extends Error {
  constructor(type, title, status, message, detail, requestId) {
    super(message);
    this.type = type;
    this.title = title;
    this.status = status;
    this.message = message;
    this.detail = detail;
    this.requestId = requestId;
    this.subErrors = [];
  }
}

export default ApiError;
