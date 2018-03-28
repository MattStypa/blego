/**
 * Creates a Blego object.
 *
 * @constructor
 * @param {object} paths
 * @param {string} paths.dest Directory to which Blego will write.
 * @param {string} paths.static Directory from which files will be copied.
 * @param {string} paths.data Directory from which files will be parsed and put into the store.
 * @param {string} paths.globals Directory from which files will be parsed and put into global context.
 * @param {string} paths.template Directory from which template files will be read.
 * @param {string} paths.partials Directory from which template partials will be read.
 * @param {boolean} [init=true] Should initialize on instantiation.
 * @property {object} store Parsed data.
 * @property {object} global Global context.
 */
function Blego(paths = {}, init = true) {
  const isTest = typeof __TEST__ !== 'undefined' && !!__TEST__;

  this.isBlego = true;
  this.store = {};
  this.global = {};
  this.internal = {paths};

  this.init = require('./Blego/init.js');
  this.macro = require('./Blego/macro.js');
  this.partial = require('./Blego/partial.js');
  this.task = require('./Blego/task.js');
  this.page = require('./Blego/page.js');
  this.log = require('./Blego/log.js');
  this.warn = require('./Blego/warn.js');
  this.dump = require('./Blego/dump.js');
  this.dd = require('./Blego/dd.js');

  this.tasks = {
    setPaths: require('./Blego/tasks/setPaths.js').bind(this),
    setCoreMacros: require('./Blego/tasks/setCoreMacros.js').bind(this),
    loadGlobals: require('./Blego/tasks/loadGlobals.js').bind(this),
    loadPartials: require('./Blego/tasks/loadPartials.js').bind(this),
    loadData: require('./Blego/tasks/loadData.js').bind(this),
    cleanUp: require('./Blego/tasks/cleanUp.js').bind(this),
    copyStatic: require('./Blego/tasks/copyStatic.js').bind(this),
  };

  this.tasks.setPaths();
  init && !isTest && this.init();
}

/** @see Store */
Blego.prototype.Store = require('./Store.js');

/** @see Record */
Blego.prototype.Record = require('./Record.js');

/** @see {@link module:tools|tools} */
Blego.prototype.tools = require('./tools.js');

module.exports = Blego;
