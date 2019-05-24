const nodePath = require('path');
const cliUtils = require('./utils.js');
const tools = require('../tools.js');

/**
 * Build project from the given build file.
 * @private
 * @param {string} [path='blego.js'] Path to the build file.
 */
function build(path = 'blego.js') {
  tools.tryCatch(
    () => {
      const startTime = process.hrtime();
      let fullPath = nodePath.resolve(path);

      !tools.isFile(fullPath) && !tools.isFile(fullPath + '.js') && cliUtils.error('Unable to find', cliUtils.quote(path));
      !tools.isFile(fullPath) && (fullPath = fullPath + '.js');

      console.log(cliUtils.emoji.rocket, 'Building from', cliUtils.quote(fullPath));

      require(fullPath);

      const diffTime = process.hrtime(startTime);
      const runTime = diffTime[0] + diffTime[1] / 1e9;
      console.log(cliUtils.emoji.finish, 'Finished in', cliUtils.magenta(runTime.toFixed(3) + 's'));      
    },
    (e) => {
      cliUtils.printTrace(e);
      process.exit(1);
    }
  );
}

module.exports = build;
