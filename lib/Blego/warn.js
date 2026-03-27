import cliUtils from '../cli/utils';

/**
 * Writes warning messages to the console
 * @param {string} messages
 */
function warn(...messages) {
  console.log(' ', cliUtils.emoji.warn, cliUtils.strong(...messages));
}

export default warn;
