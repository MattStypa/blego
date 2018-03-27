const chalk = require('chalk');
const nodeEmoji = require('node-emoji');
const parseTrace = require('../tools/parseTrace.js');

const emoji = {
  construction: nodeEmoji.get('construction') + ' ',
  fail: nodeEmoji.get('no_entry_sign') + ' ',
  finish: nodeEmoji.get('checkered_flag') + ' ',
  info: nodeEmoji.get('thought_balloon') + ' ',
  rocket: nodeEmoji.get('rocket') + ' ',
  warn: nodeEmoji.get('warning') + ' ',
};

/**
 * Writes an error to console and exits the process.
 *
 * @private
 * @param {string} messages Messages to write to console.
 */
function error(...messages) {
  console.error(emoji.fail, ...messages);
  process.exit(1);
}

/**
 * Prints trace to console.
 *
 * @private
 * @param {error} error Error object to be printed.
 */
function printTrace(error) {
  const trace = parseTrace(error);
  console.error(' ', emoji.fail, chalk.bold.bgRed.whiteBright('', error.name, ''), strong(error.message));
  trace.forEach((item) => console.log('    ', '-', chalk.cyan(item.file) + ':' + chalk.magenta(item.line), chalk.green(item.function)));
}

/**
 * Gets quoted string.
 *
 * @private
 * @param {string} str String to quote.
 * @returns {string}
 */
function quote(str) {
  return chalk.cyan(`'${str}'`);
}

/**
 * Gets stylized string.
 *
 * @private
 * @param {string} str String to stylized.
 * @returns {string}
 */
function magenta(str) {
  return chalk.magenta(str);
}

/**
 * Gets stylized string.
 *
 * @private
 * @param {string} str String to stylized.
 * @returns {string}
 */
function strong(str) {
  return chalk.bold.underline(str);
}

module.exports = {emoji, error, printTrace, quote, magenta, strong};
