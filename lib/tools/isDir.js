import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors.js';
import exists from './exists.js';
import tryCatch from './tryCatch.js';
import validateType from './validateType.js';

/**
 * Checks if path exists and is a directory
 * @param {string} path
 * @returns {boolean}
 */
function isDir(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  let isDir = false;

  tryCatch(
    () => isDir = exists(path) && fs.statSync(path).isDirectory(),
    () => errors.cantReadPath(path)
  );

  return isDir;
}

export default isDir;
