const nodePath = require('path');
const Record = require('./Record.js');
const Store = require('./Store.js');
const handlebars = require('./handlebars.js');
const paths = require('./paths.js');
const tools = require('./tools.js');

/**
 * Creates a Blego object.
 * @class
 * @hideconstructor
 */
function Blego() {
  this.data = {};
  this.global = {};

  this.dd = require('./Blego/dd.js').bind(this);
  this.dump = require('./Blego/dump.js').bind(this);
  this.log = require('./Blego/log.js').bind(this);
  this.macro = require('./Blego/macro.js').bind(this);
  this.page = require('./Blego/page.js').bind(this);
  this.partial = require('./Blego/partial.js').bind(this);
  this.warn = require('./Blego/warn.js').bind(this);

  // Macros
  this.macro('dd', this.dd);
  this.macro('dump', this.dump);

  // Partials
  tools.parseDataDir(paths.partials).forEach(file => handlebars.registerPartial(file.key, file.props.body));

  // Globals
  this.global = getStoreFromDataDir(paths.globals).keyed();

  // Data
  tools.readDir(paths.data, '*', 'true').filter(tools.isDir).forEach(storePath => this.data[nodePath.parse(storePath).name] = getStoreFromDataDir(storePath));

  // Destination
  tools.exists(paths.dest) && tools.cleanDir(paths.dest);
  tools.copy(paths.static, paths.dest);
}

function getStoreFromDataDir(path) {
  const store = new Store(tools.parseDataDir(path).map(record => new Record(record.key, record.props)));

  return store.sortBy('key');
}

module.exports = Blego;
