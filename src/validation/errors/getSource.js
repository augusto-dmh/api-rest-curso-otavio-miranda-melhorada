export default (trace) => {
  const functionName = trace[0].getFunctionName();
  const fileName = trace[0].getFileName();
  const lineNumber = trace[0].getLineNumber();
  return { functionName, fileName, lineNumber };
};
