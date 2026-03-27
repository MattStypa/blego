import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors';
import exists from './exists';
import isFile from './isFile';
import tryCatch from './tryCatch';
import validateType from './validateType';

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
