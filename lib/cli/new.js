import childProcess from 'child_process';
import nodePath from 'path';
import fs from 'fs-extra';
import cliUtils from './utils.js';
import copy from '../tools/copy.js';
import exists from '../tools/exists.js';

/**
 * Creates a new Blego project
 * @param {string} path Path to the project directory
 */
function newProject(path) {
  const fullPath = nodePath.resolve(path);

  exists(fullPath) && cliUtils.error(cliUtils.quote(fullPath), 'already exists');

  console.log(cliUtils.emoji.rocket, 'Creating new Blego project');
  console.log();

  fs.ensureDirSync(fullPath);
  copy(nodePath.resolve(__dirname, 'blueprint'), fullPath);
  fs.moveSync(nodePath.resolve(fullPath, '.gitignore.blueprint'), nodePath.resolve(fullPath, '.gitignore'));
  process.chdir(fullPath);

  childProcess.spawnSync('npm', ['install', 'blego', '--save'], {stdio: 'inherit'});

  console.log();
  console.log(cliUtils.emoji.gift, 'New Blego project is ready in', cliUtils.quote(fullPath));
}

export default newProject;
