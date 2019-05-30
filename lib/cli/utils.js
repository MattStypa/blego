const chalk = require('chalk');
const nodeEmoji = require('node-emoji');
const parseTrace = require('../tools/parseTrace.js');

const emoji = {
  construction: nodeEmoji.get('construction') + ' ',
  fail: nodeEmoji.get('no_entry_sign') + ' ',
  finish: nodeEmoji.get('checkered_flag') + ' ',
  gift: nodeEmoji.get('gift') + ' ',
  info: nodeEmoji.get('thought_balloon') + ' ',
  rocket: nodeEmoji.get('rocket') + ' ',
  warn: nodeEmoji.get('warning') + ' ',
};

/**
 * Writes an error to the console and exits the process
 * @param {string} messages
 */
function error(...messages) {
  console.error(emoji.fail, ...messages);
  process.exit(1);
}

/**
 * Prints a trace to the console and exits the process
 * @param {Error} error
 */
function printTraceAndDie(error) {
  const trace = parseTrace(error);
  console.error(' ', emoji.fail, chalk.bold.bgRed.whiteBright('', error.name, ''), strong(error.message));
  trace.forEach((item) => console.log('    ', '-', chalk.cyan(item.file) + ':' + chalk.magenta(item.line), chalk.green(item.function)));
  process.exit(1);
}

/**
 * Gets a quoted string
 * @param {string} str String to quote
 * @returns {string}
 */
function quote(str) {
  return chalk.cyan(`'${str}'`);
}

/**
 * Gets a stylized string
 * @param {string} str String to stylize
 * @returns {string}
 */
function magenta(str) {
  return chalk.magenta(str);
}

/**
 * Gets a stylized string
 * @param {string} str String to stylize
 * @returns {string}
 */
function strong(str) {
  return chalk.bold.underline(str);
}

module.exports = {emoji, error, printTraceAndDie, quote, magenta, strong};
