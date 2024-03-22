class Log {
  constructor(status, detail, source, build_info, requestId, stack) {
    this.status = status;
    this.detail = detail;
    this.source = source;
    this.build_info = build_info;
    this.requestId = requestId;
    this.stack = stack;
  }
}

export default Log;
