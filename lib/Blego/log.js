const cliUtils = require('../cli/utils.js');

/**
 * Writes log messages to the console
 * @param {string} messages
 */
function log(...messages) {
  console.log(' ', cliUtils.emoji.info, ...messages);
}

module.exports = log;
