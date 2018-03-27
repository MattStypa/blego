const cliUtils = require('../cli/utils.js');

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

      console.log(cliUtils.emoji.construction, 'Running', cliUtils.quote(label), '...');
      const startTime = process.hrtime();
      fn();
      const diffTime = process.hrtime(startTime);
      const runTime = diffTime[0] + diffTime[1] / 1e9;
      console.log(cliUtils.emoji.finish, 'Finished', cliUtils.quote(label), 'in', cliUtils.magenta(runTime.toFixed(3) + 's'));
      console.log();
    },
    (e) => {
      cliUtils.printTrace(e);
      process.exit(1);
    }
  );
}

module.exports = task;
