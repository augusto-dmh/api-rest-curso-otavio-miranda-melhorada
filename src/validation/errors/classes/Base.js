class Base {
  constructor(type, title, message, status, subErrors) {
    this.type = type;
    this.title = title;
    this.message = message;
    this.status = status;
    this.subErrors = subErrors;
  }

  *[Symbol.iterator]() {
    yield this.type;
    yield this.title;
    yield this.message;
    yield this.status;
    yield this.subErrors;
  }
}

export default Base;
