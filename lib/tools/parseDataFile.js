import nodePath from 'path';
import parsers from '../parsers.js';
import errors from '../errors.js';
import tryCatch from './tryCatch.js';
import validateType from './validateType.js';

/**
 * Reads data from a file and parses it
 * @param {string} path
 * @returns {object}
 */
function parseDataFile(path) {
  validateType('path', 'string', path);

  const type = nodePath.extname(path).slice(1).toLowerCase();

  path = nodePath.resolve(path);
  !type && errors.noType(path);
  !parsers[type] && errors.noParser(path);

  let content;

  tryCatch(
    () => content = parsers[type](path),
    () => errors.cantParse(path)
  );

  return content;
}

export default parseDataFile;
