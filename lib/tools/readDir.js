import nodePath from 'path';
import { globSync } from 'glob';
import errors from '../errors.js';
import exists from './exists.js';
import isDir from './isDir.js';
import tryCatch from './tryCatch.js';
import validateType from './validateType.js';

/**
 * Recursively reads files from a directory that match a pattern
 * @param {string} path Path to a directory
 * @param {string} [pattern='** / *'] Glob pattern. Default value is without spaces
 * @param {boolean} [includeDirs=false] Should directories be included
 * @param {boolean} [includeDotFiles=false] Should dot file be included
 * @returns {array}
 */
function readDir(path, pattern = '**/*', includeDirs = false, includeDotFiles = false) {
  validateType('path', 'string', path);
  validateType('pattern', 'string', pattern);

  path = nodePath.resolve(path);
  !exists(path) && errors.pathDoesNotExist(path);
  !isDir(path) && errors.notDir(path);
  let content;

  tryCatch(
    () => content = globSync(nodePath.resolve(path, pattern), {nodir: !includeDirs, dot: includeDotFiles}),
    () => errors.cantReadPath(path)
  );

  content = content.sort();

  return content;
}

export default readDir;
