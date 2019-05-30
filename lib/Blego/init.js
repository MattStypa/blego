const nodePath = require('path');
const Record = require('../Record.js');
const Store = require('../Store.js');
const handlebars = require('../handlebars.js');
const paths = require('../paths.js');
const cleanDir = require('../tools/cleanDir.js');
const copy = require('../tools/copy.js');
const exists = require('../tools/exists.js');
const isDir = require('../tools/isDir.js');
const parseDataDir = require('../tools/parseDataDir.js');
const readDir = require('../tools/readDir.js');

/**
 * Initilizes Blego.
 * @memberof Blego
 */
function init() {
  // Macros
  this.macro('dd', this.dd);
  this.macro('dump', this.dump);

  // Partials
  parseDataDir(paths.partials).forEach((file) => handlebars.registerPartial(file.key, file.props.body));

  // Globals
  this.global = getStoreFromDataDir(paths.globals).keyed();

  // Data
  readDir(paths.data, '*', 'true').filter(isDir).forEach((storePath) => this.data[nodePath.parse(storePath).name] = getStoreFromDataDir(storePath));

  // Destination
  exists(paths.dest) && cleanDir(paths.dest);
  copy(paths.static, paths.dest);
}

/**
 * Read a directory and creates a Store from the data.
 * @private
 * @param {string} path Path to the data directory.
 * @return {Store}
 */
function getStoreFromDataDir(path) {
  const store = new Store(parseDataDir(path).map((record) => new Record(record.key, record.props)));

  return store.sortBy('key');
}

module.exports = init;
