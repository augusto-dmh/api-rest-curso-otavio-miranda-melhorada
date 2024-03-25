export default (trace) => {
  const regex = /src(.*)/;

  const functionName = trace[0].getFunctionName();
  const fileName = trace[0].getFileName().match(regex)[0];
  const lineNumber = trace[0].getLineNumber();
  return { functionName, fileName, lineNumber };
};
