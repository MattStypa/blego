const childProcess = require('child_process');
const nodePath = require('path');
const fs = require('fs-extra');
const cliUtils = require('./utils.js');
const tools = require('../tools.js');

/**
 * Creates new Blego project.
 *
 * @private
 * @param {string} path Path to the project directory.
 */
function newProject(path) {
  const fullPath = nodePath.resolve(path);

  tools.exists(fullPath) && cliUtils.error(cliUtils.quote(fullPath), 'already exists');

  console.log(cliUtils.emoji.rocket, 'Creating new Blego project');
  console.log();

  fs.ensureDirSync(fullPath);
  tools.copy(nodePath.resolve(__dirname, 'blueprint'), fullPath);
  fs.moveSync(nodePath.resolve(fullPath, '.gitignore.blueprint'), nodePath.resolve(fullPath, '.gitignore'));
  process.chdir(fullPath);

  childProcess.spawnSync('npm', ['install', 'blego', '--save'], {stdio: 'inherit'});

  console.log();
  console.log(cliUtils.emoji.gift, 'New Blego project is ready in', cliUtils.quote(fullPath));
}

module.exports = newProject;
