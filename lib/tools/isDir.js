import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors';
import exists from './exists';
import tryCatch from './tryCatch';
import validateType from './validateType';

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
