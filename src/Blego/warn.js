const cliUtils = require('../cli/utils.js');

/**
 * Writes warning message to console.
 *
 * @instance
 * @memberof Blego
 * @param {string} message Message to write to console.
 */
function warn(message) {
  this.tools.validateType('message', 'string', message);
  console.log(' ', cliUtils.emoji.warn, cliUtils.strong(message));
}

module.exports = warn;
