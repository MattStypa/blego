/**
 * Creates a Blego object.
 *
 * @class
 * @hideconstructor
 */
function Blego() {
  /**
   * Parsed data.
   * @member {Object}
   */
  this.store = {};

  /**
   * Global context.
   * @member {Object}
   */
  this.global = {};

  /**
   * Global context.
   * @member {Object}
   * @prop {string} dest Directory to which Blego will write.
   * @prop {string} static Directory from which files will be copied.
   * @prop {string} data Directory from which files will be parsed and put into the store.
   * @prop {string} globals Directory from which files will be parsed and put into global context.
   * @prop {string} template Directory from which template files will be read.
   * @prop {string} partials Directory from which template partials will be read.
   */
  this.paths = {
    dest: './dist',
    static: './static',
    data: './data',
    globals: './globals',
    template: './template',
    partials: './template/partials',
  };

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

  /**
   * Handlebars environment.
   * @see {@link http://handlebarsjs.com}
   */
  this.handlebars = require('handlebars');

  /** @see {@link module:tasks|tasks} */
  this.tasks = tasks;
}

module.exports = new Blego();
