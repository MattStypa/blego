import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors';
import tryCatch from './tryCatch';
import validateType from './validateType';

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
