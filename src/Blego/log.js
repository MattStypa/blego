const chalk = require('chalk');
const emoji = require('node-emoji');
const errors = require('../errors.js');

const EMOJI = {
  info: emoji.get('thought_balloon') + ' ',
};

/**
 * Writes log message to console.
 *
 * @instance
 * @memberof Blego
 * @param {string} message Message to write to console.
 */
function log(message) {
  this.tools.validateType('message', 'string', message);
  console.log(' ', EMOJI.info, message);
}

module.exports = log;
