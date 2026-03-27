import nodePath from 'path';
import errors from '../errors';
import parsers from '../parsers';
import tryCatch from './tryCatch';
import validateType from './validateType';

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
