const cliUtils = require('../cli/utils.js');

/**
 * Writes log message to console.
 *
 * @instance
 * @memberof Blego
 * @param {string} message Message to write to console.
 */
function log(message) {
  this.tools.validateType('message', 'string', message);
  console.log(' ', cliUtils.emoji.info, message);
}

module.exports = log;
