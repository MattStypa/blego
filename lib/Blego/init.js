const nodePath = require('path');
const Record = require('../Record.js');
const Store = require('../Store.js');
const handlebars = require('../handlebars.js');
const paths = require('../paths.js');
const cleanDir = require('../tools/cleanDir.js');
const copy = require('../tools/copy.js');
const exists = require('../tools/exists.js');
const isDir = require('../tools/isDir.js');
const isFile = require('../tools/isFile.js');
const parseDataDir = require('../tools/parseDataDir.js');
const readDir = require('../tools/readDir.js');
const readFile = require('../tools/readFile.js');

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

module.exports = init;
