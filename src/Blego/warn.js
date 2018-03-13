const chalk = require('chalk');
const emoji = require('node-emoji');
const errors = require('../errors.js');

const EMOJI = {
  warn: emoji.get('warning') + ' ',
};

/**
 * Writes warning message to console.
 *
 * @instance
 * @memberof Blego
 * @param {string} message Message to write to console.
 */
function warn(message) {
  this.tools.validateType('message', 'string', message);
  console.log(' ', EMOJI.warn, chalk.bold.underline(message));
}

module.exports = warn;
