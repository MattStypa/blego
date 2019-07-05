const nodePath = require('path');
const cliUtils = require('./utils.js');
const isFile = require('../tools/isFile.js');
const tryCatch = require('../tools/tryCatch.js');

/**
 * Builds a project from the given build file
 * @param {string} [path='blego.js']
 */
function build(path = 'blego.js') {
  const startTime = process.hrtime();
  let fullPath = nodePath.resolve(path);

  !isFile(fullPath) && !isFile(fullPath + '.js') && cliUtils.error('Unable to find', cliUtils.quote(path));
  !isFile(fullPath) && (fullPath = fullPath + '.js');

  console.log(cliUtils.emoji.rocket, 'Building from', cliUtils.quote(fullPath));

  tryCatch(
    () => require(fullPath),
    (e) => cliUtils.printTraceAndDie(e)
  );

  const diffTime = process.hrtime(startTime);
  const runTime = diffTime[0] + diffTime[1] / 1e9;

  console.log(cliUtils.emoji.finish, 'Finished in', cliUtils.magenta(runTime.toFixed(3) + 's'));
}

module.exports = build;
