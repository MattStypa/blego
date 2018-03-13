const _ = require('lodash');

/**
 * Creates a Blego object.
 *
 * @constructor
 * @param {object} options
 * @param {array} options.plugins Plugins are functions that take an instance of Blego as parameter.
 * @param {object} options.paths
 * @param {string} options.paths.dest Directory to which Blego will write.
 * @param {string} options.paths.static Directory from which files will be copied.
 * @param {string} options.paths.data Directory from which files will be parsed and put into the store.
 * @param {string} options.paths.config Directory from which files will be parsed and put into config.
 * @param {string} options.paths.template Directory from which template files will be read.
 * @param {string} options.paths.partials Directory from which template partials will be read.
 * @property {object} store Parsed data.
 * @property {config} config Parsed config.
 */
function Blego(options) {
  this.isBlego = true;
  this.store = {};
  this.config = {};
  this.options = _.merge({}, options);

  this.init = require('./Blego/init.js');
  this.macro = require('./Blego/macro.js');
  this.task = require('./Blego/task.js');
  this.page = require('./Blego/page.js');
  this.log = require('./Blego/log.js');
  this.warn = require('./Blego/warn.js');
  this.dump = require('./Blego/dump.js');
  this.dd = require('./Blego/dd.js');

  this.tasks = {
    loadOptions: require('./Blego/tasks/loadOptions.js').bind(this),
    loadPlugins: require('./Blego/tasks/loadPlugins.js').bind(this),
    setCoreMacros: require('./Blego/tasks/setCoreMacros.js').bind(this),
    loadConfig: require('./Blego/tasks/loadConfig.js').bind(this),
    loadPartials: require('./Blego/tasks/loadPartials.js').bind(this),
    loadData: require('./Blego/tasks/loadData.js').bind(this),
    cleanUp: require('./Blego/tasks/cleanUp.js').bind(this),
    copyStatic: require('./Blego/tasks/copyStatic.js').bind(this),
  };

  this.tasks.loadOptions();
  this.tasks.loadPlugins();
}

/** @see {@link module:tools|tools} */
Blego.prototype.tools = require('./tools.js');

/** @see Store */
Blego.prototype.Store = require('./Store.js');

/** @see Record */
Blego.prototype.Record = require('./Record.js');

module.exports = Blego;
