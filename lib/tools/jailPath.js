import nodePath from 'path';
import validateType from './validateType';

/**
 * Prevents path from escaping its base directory
 * @param {string} path
 * @returns {string}
 */
function jailPath(path) {
  validateType('path', 'string', path);

  return nodePath.relative('/', nodePath.resolve('/', path));
}

export default jailPath;
