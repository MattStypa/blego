import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors.js';
import exists from './exists.js';
import isDir from './isDir.js';
import tryCatch from './tryCatch.js';
import validateType from './validateType.js';

/**
 * Deletes everything from a given directory
 * This can not be undone. Be sure that you know what you are doing
 * @param {string} path
 */
function cleanDir(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  !exists(path) && errors.pathDoesNotExist(path);
  !isDir(path) && errors.notDir(path);

  tryCatch(
    () => fs.emptyDirSync(path),
    () => errors.cantClean(path)
  );
}

export default cleanDir;
