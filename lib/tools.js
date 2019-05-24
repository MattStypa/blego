/**
 * @module tools
 */
module.exports = {
  cleanDir: require('./tools/cleanDir.js'),
  copy: require('./tools/copy.js'),
  exists: require('./tools/exists.js'),
  getTypesString: require('./tools/getTypesString.js'),
  isDir: require('./tools/isDir.js'),
  isFile: require('./tools/isFile.js'),
  jailPath: require('./tools/jailPath.js'),
  parseDataDir: require('./tools/parseDataDir.js'), // private
  parseDataFile: require('./tools/parseDataFile.js'), // private
  parseTrace: require('./tools/parseTrace.js'), // private
  readDir: require('./tools/readDir.js'),
  readFile: require('./tools/readFile.js'),
  tryCatch: require('./tools/tryCatch.js'),
  validateType: require('./tools/validateType.js'),
  validateTypeInArray: require('./tools/validateTypeInArray.js'),
};
