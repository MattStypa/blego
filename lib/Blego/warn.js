const cliUtils = require('../cli/utils.js');

/**
 * Writes warning messages to console.
 * @memberof Blego
 * @param {string} messages Messages to write to console.
 */
function warn(...messages) {
  console.log(' ', cliUtils.emoji.warn, cliUtils.strong(...messages));
}

module.exports = warn;
