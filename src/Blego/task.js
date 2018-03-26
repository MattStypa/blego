const chalk = require('chalk');
const emoji = require('node-emoji');
const parseTrace = require('../tools/parseTrace.js');

const EMOJI = {
  wait: emoji.get('construction') + ' ',
  finish: emoji.get('checkered_flag') + ' ',
  fail: emoji.get('no_entry_sign') + ' ',
};

/**
 * Runs given task.
 *
 * @instance
 * @memberof Blego
 * @param {string} label Label of the task.
 * @param {function} fn Task function.
 */
function task(label, fn) {
  this.tools.tryCatch(
    () => {
      this.tools.validateType('label', 'string', label);
      this.tools.validateType('fn', 'function', fn);

      console.log(EMOJI.wait, 'Running', quote(chalk.cyan(label)), '...');
      const startTime = process.hrtime();
      fn();
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
