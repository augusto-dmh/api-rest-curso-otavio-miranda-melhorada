class LogError {
  constructor(status, message, source, build_info, requestId, stack) {
    this.status = status;
    this.message = message;
    this.source = source;
    this.build_info = build_info;
    this.requestId = requestId;
    this.stack = stack;
  }
}

export default LogError;
