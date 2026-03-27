import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors.js';
import exists from './exists.js';
import isFile from './isFile.js';
import tryCatch from './tryCatch.js';
import validateType from './validateType.js';

/**
 * Reads content from a file
 * @param {string} path
 * @returns {string}
 */
function readFile(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  !exists(path) && errors.pathDoesNotExist(path);
  !isFile(path) && errors.notFile(path);
  let content;

  tryCatch(
    () => content = fs.readFileSync(path).toString(),
    () => errors.cantReadPath(path)
  );

  return content;
}

export default readFile;
