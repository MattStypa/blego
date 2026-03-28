import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors.js';
import exists from './exists.js';
import tryCatch from './tryCatch.js';
import validateType from './validateType.js';

/**
 * Checks if path exists and is a file
 * @param {string} path
 * @returns {boolean}
 */
function isFile(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  let isFile = false;

  tryCatch(
    () => isFile = exists(path) && fs.statSync(path).isFile(),
    () => errors.cantReadPath(path)
  );

  return isFile;
}

export default isFile;
