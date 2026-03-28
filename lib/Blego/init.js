import nodePath from 'path';
import handlebars from 'handlebars';
import Record from '../Record.js';
import Store from '../Store.js';
import paths from '../paths.js';
import cleanDir from '../tools/cleanDir.js';
import copy from '../tools/copy.js';
import exists from '../tools/exists.js';
import isDir from '../tools/isDir.js';
import isFile from '../tools/isFile.js';
import parseDataDir from '../tools/parseDataDir.js';
import readDir from '../tools/readDir.js';
import readFile from '../tools/readFile.js';

/**
 * Initilizes Blego
 */
function init() {
  // Macros
  this.macro('dd', this.dd);
  this.macro('dump', this.dump);

  // Templates
  readDir(paths.template).filter(isFile).forEach((file) => handlebars.registerPartial(
    nodePath.relative(paths.template, file),
    readFile(file)
  ));

  // Globals
  this.global = getStoreFromDataDir(paths.globals).keyed();

  // Data
  readDir(paths.data, '*', true).filter(isDir).forEach((storePath) => this.data[nodePath.parse(storePath).name] = getStoreFromDataDir(storePath));

  // Destination
  exists(paths.dest) && cleanDir(paths.dest);
  copy(paths.static, paths.dest);
}

/**
 * Reads a data directory and creates a Store from the data
 * @param {string} path
 * @return {Store}
 */
function getStoreFromDataDir(path) {
  const store = new Store(parseDataDir(path).map((record) => new Record(record.key, record.props)));

  return store.sortBy('key');
}

export default init;
