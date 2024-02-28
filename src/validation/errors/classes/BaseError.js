class BaseError extends Error {
  constructor(type, title, message) {
    super(message);
    this.type = type;
    this.title = title;
  }
}

export default BaseError;
