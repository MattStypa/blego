import cliUtils from '../cli/utils.js';

/**
 * Writes log messages to the console
 * @param {string} messages
 */
function log(...messages) {
  console.log(' ', cliUtils.emoji.info, ...messages);
}

export default log;
