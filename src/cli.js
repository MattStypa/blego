const nodePath = require('path');
const chalk = require('chalk');
const program = require('commander');
const emoji = require('node-emoji');
const package = require('../package.json');
const isFile = require('./tools/isFile.js');

const EMOJI = {
  rocket: emoji.get('rocket') + ' ',
  fail: emoji.get('no_entry_sign') + ' ',
};

program
  .version(package.version, '-v, --version')
  .usage('<command> [args]');

program
  .command('build [path]')
  .description('builds Blego project')
  .action(build);

program
  .command('*', null, {noHelp: true})
  .action(() => {
    program.help();
  });

program.parse(process.argv);

if (program.args.length === 0) {
  build();
}

function build(path = 'blego.js') {
  !isFile(path) && !isFile(path + '.js') && error('Unable to find ' + quote(chalk.cyan(path)));
  !isFile(path) && (path = path + '.js');

  console.log(EMOJI.rocket, 'Building from', quote(chalk.cyan(path)));
  console.log();

  require(nodePath.resolve(path));
}

function error(message = '') {
  console.error(EMOJI.fail, message);
  process.exit(1);
}

function quote(str) {
  return `'${str}'`;
}

module.exports.build = build;
