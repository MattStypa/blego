const cliUtils = require('../cli/utils.js');

/**
 * Writes warning messages to the console
 * @param {string} messages
 */
function warn(...messages) {
  console.log(' ', cliUtils.emoji.warn, cliUtils.strong(...messages));
}

module.exports = warn;
