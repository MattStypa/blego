const chalk = require('chalk');
const emoji = require('node-emoji');
const parseTrace = require('../tools/parseTrace.js');

const EMOJI = {
  wait: emoji.get('clock3') + ' ',
  finish: emoji.get('white_check_mark') + ' ',
  fail: emoji.get('no_entry_sign') + ' ',
};

/**
 * Runs specified task.
 *
 * @instance
 * @memberof Blego
 * @param {string} label Label of the task.
 * @param {function} func Task function.
 */
function task(label, func) {
  this.tools.tryCatch(
    () => {
      this.tools.validateType('label', 'string', label);
      this.tools.validateType('func', 'function', func);

      console.log(EMOJI.wait, 'Running', quote(chalk.cyan(label)), '...');
      const startTime = process.hrtime();
      func();
      const diffTime = process.hrtime(startTime);
      const runTime = diffTime[0] + diffTime[1] / 1e9;
      console.log(EMOJI.finish, 'Finished', quote(chalk.cyan(label)), 'in', chalk.magenta(runTime.toFixed(3) + 's'));
      console.log();
    },
    (e) => {
      const trace = parseTrace(e);
      console.error(' ', EMOJI.fail, chalk.bold.bgRed.whiteBright('', e.name, ''), chalk.bold.underline(e.message));
      trace.forEach((item) => console.log('    ', '-', chalk.cyan(item.file) + ':' + chalk.magenta(item.line), chalk.green(item.function)));
      process.exit(1);
    }
  );
}

function quote(str) {
  return `'${str}'`;
}

module.exports = task;
