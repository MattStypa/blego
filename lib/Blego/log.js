const cliUtils = require('../cli/utils.js');

/**
 * Writes log messages to console.
 * @memberof Blego
 * @param {string} messages Messages to write to console.
 */
function log(...messages) {
  console.log(' ', cliUtils.emoji.info, ...messages);
}

module.exports = log;
