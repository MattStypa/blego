const nodePath = require('path');
const cliUtils = require('./utils.js');
const isFile = require('../tools/isFile.js');

/**
 * Build project from the given build file.
 *
 * @private
 * @param {string} [path='blego.js'] Path to the build file.
 */
function build(path = 'blego.js') {
  let fullPath = nodePath.resolve(path);

  !isFile(fullPath) && !isFile(fullPath + '.js') && cliUtils.error('Unable to find', cliUtils.quote(path));
  !isFile(fullPath) && (fullPath = fullPath + '.js');


  console.log(cliUtils.emoji.rocket, 'Building from', cliUtils.quote(fullPath));
  console.log();

  require(fullPath);
}

module.exports = build;
