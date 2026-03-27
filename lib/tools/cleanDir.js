import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors';
import exists from './exists';
import isDir from './isDir';
import tryCatch from './tryCatch';
import validateType from './validateType';

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
