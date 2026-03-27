import nodePath from 'path';
import Record from '../Record';
import Store from '../Store';
import handlebars from '../handlebars';
import paths from '../paths';
import cleanDir from '../tools/cleanDir';
import copy from '../tools/copy';
import exists from '../tools/exists';
import isDir from '../tools/isDir';
import isFile from '../tools/isFile';
import parseDataDir from '../tools/parseDataDir';
import readDir from '../tools/readDir';
import readFile from '../tools/readFile';

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
