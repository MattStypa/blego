import nodePath from 'path';
import stackTrace from 'stack-trace';
import isFile from './isFile.js';

/**
 * Parses stack trace from an Error object
 * @param {Error} error
 * @returns {object}
 */
function parseTrace(error) {
  const trace = stackTrace.parse(error).filter((item) => item.fileName && isFile(item.fileName));

  return trace.map((item) => ({
    file: nodePath.relative(process.cwd(), item.fileName),
    line: item.lineNumber,
    function: item.methodName || 'Anonymous',
  }));
}

export default parseTrace;
