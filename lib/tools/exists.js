import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors.js';
import tryCatch from './tryCatch.js';
import validateType from './validateType.js';

/**
 * Checks if the path exists
 * @param {string} path
 * @returns {boolean}
 */
function exists(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  let exists = false;

  tryCatch(
    () => exists = fs.existsSync(path),
    () => errors.cantReadPath(path)
  );

  return exists;
}

export default exists;
