const util = require('util');

const ERRORS = {
  cantClean: 'Unable to clean "%s" directory.',
  cantCopy: 'Unable to copy "%s" to "%s".',
  cantParse: 'Unable to parse "%s". Check syntax.',
  cantReadPath: 'Unable to read "%s".',
  invalidType: 'Value of "%s" must be of type %s; not %s.',
  invalidTypeInArray: 'All values of "%s" must be of type %s; not %s',
  keyRequired: 'Key is required.',
  noType: '"%s" has no type.',
  noParser: '"%s" has unsupported type.',
  notFile: '"%s" is not a file.',
  notDir: '"%s" is not a directory.',
  pathExists: '"%s" already exists.',
  pathDoesNotExist: '"%s" does not exist.',
  recordLinked: 'Record with "%s" key from "%s" prop in "%s" was already linked from "%s".',
  recordNotFound: 'Record with "%s" key from "%s" prop in "%s" does not exist.',
  recordKeyDupe: 'All records must have a unique key.',
};

/**
 * Converts type or array of types to a comma seperated string representation
 * @param {mixed} types
 * @returns {string}
 */
function formatTypes(types) {
  const typesArray = Array.isArray(types) ? [].concat(types) : [types];
  const lastType = typesArray.pop();

  return !typesArray.length ? lastType : `${typesArray.join(', ')} or ${lastType}`;
}

module.exports = {
  cantClean: (path) => { throw new Error(util.format(ERRORS.cantClean, path)) },
  cantCopy: (src, dest) => { throw new Error(util.format(ERRORS.cantCopy, src, dest)) },
  cantParse: (path) => { throw new Error(util.format(ERRORS.cantParse, path)) },
  cantReadPath: (path) => { throw new Error(util.format(ERRORS.cantReadPath, path)) },
  invalidType: (name, expectedType, actualType) => { throw new Error(util.format(ERRORS.invalidType, name, formatTypes(expectedType), actualType)) },
  invalidTypeInArray: (name, expectedType, actualType) => { throw new Error(util.format(ERRORS.invalidTypeInArray, name, formatTypes(expectedType), actualType)) },
  keyRequired: () => { throw new Error(ERRORS.keyRequired) },
  noType: (path) => { throw new Error(util.format(ERRORS.noType, path)) },
  noParser: (path) => { throw new Error(util.format(ERRORS.noParser, path)) },
  notFile: (path) => { throw new Error(util.format(ERRORS.notFile, path)) },
  notDir: (path) => { throw new Error(util.format(ERRORS.notDir, path)) },
  pathExists: (path) => { throw new Error(util.format(ERRORS.pathExists, path)) },
  pathDoesNotExist: (path) => { throw new Error(util.format(ERRORS.pathDoesNotExist, path)) },
  recordLinked: (ref, prop, key, link) => { throw new Error(util.format(ERRORS.recordLinked, ref, prop, key, link)) },
  recordNotFound: (ref, prop, key) => { throw new Error(util.format(ERRORS.recordNotFound, ref, prop, key)) },
  recordKeyDupe: () => { throw new Error(ERRORS.recordKeyDupe) },
};
