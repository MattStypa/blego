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

function error(...messages) {
  console.error(emoji.fail, ...messages);
  process.exit(1);
}

function printTrace(e) {
  const trace = parseTrace(e);
  console.error(' ', emoji.fail, chalk.bold.bgRed.whiteBright('', e.name, ''), strong(e.message));
  trace.forEach((item) => console.log('    ', '-', chalk.cyan(item.file) + ':' + chalk.magenta(item.line), chalk.green(item.function)));
}

function quote(str) {
  return chalk.cyan(`'${str}'`);
}

function magenta(str) {
  return chalk.magenta(str);
}

function strong(str) {
  return chalk.bold.underline(str);
}

module.exports = {emoji, error, printTrace, quote, magenta, strong};
