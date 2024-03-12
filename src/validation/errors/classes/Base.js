class Base {
  constructor(status, type, title, message, subErrors) {
    this.status = status;
    this.type = type;
    this.title = title;
    this.message = message;
    this.subErrors = subErrors;
  }

  *[Symbol.iterator]() {
    yield this.status;
    yield this.type;
    yield this.title;
    yield this.message;
    yield this.subErrors;
  }
}

export default Base;
