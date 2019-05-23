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
 * @property {object} store Parsed data.
 * @property {object} global Global context.
 */
function Blego(paths = {}) {
  this.store = {};
  this.global = {};
  this.internal = {paths};

  this.init = require('./Blego/init.js').bind(this);
  this.task = require('./Blego/task.js').bind(this);
  this.page = require('./Blego/page.js').bind(this);
  this.macro = require('./Blego/macro.js').bind(this);
  this.partial = require('./Blego/partial.js').bind(this);
  this.log = require('./Blego/log.js').bind(this);
  this.warn = require('./Blego/warn.js').bind(this);
  this.dump = require('./Blego/dump.js').bind(this);
  this.dd = require('./Blego/dd.js').bind(this);

  /** @module tasks */
  const tasks = {
    setPaths: require('./Blego/tasks/setPaths.js').bind(this),
    setCoreMacros: require('./Blego/tasks/setCoreMacros.js').bind(this),
    loadGlobals: require('./Blego/tasks/loadGlobals.js').bind(this),
    loadPartials: require('./Blego/tasks/loadPartials.js').bind(this),
    loadData: require('./Blego/tasks/loadData.js').bind(this),
    cleanUp: require('./Blego/tasks/cleanUp.js').bind(this),
    copyStatic: require('./Blego/tasks/copyStatic.js').bind(this),
  }

  /** @see Record */
  this.Record = require('./Record.js');

  /** @see Store */
  this.Store = require('./Store.js');

  /** @see {@link module:tools|tools} */
  this.tools = require('./tools.js');

  /** @see {@link module:parsers|parsers} */
  this.parsers = require('./parsers.js');

  /** @see {@link http://handlebarsjs.com} */
  this.handlebars = require('handlebars');

  /** @see {@link module:tasks|tasks} */
  this.tasks = tasks;

  this.tasks.setPaths();
}

module.exports = new Blego();
