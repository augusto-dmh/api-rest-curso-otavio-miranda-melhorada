class BaseError extends Error {
  constructor(type, title, message) {
    super(message);
    this.type = type;
    this.title = title;
  }

  *[Symbol.iterator]() {
    yield this.type;
    yield this.title;
    yield this.message;
    yield this.status;
    yield this.subErrors;
  }
}

export default BaseError;
