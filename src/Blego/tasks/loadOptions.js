const _ = require('lodash');
const defaultOptions = require('../defaultOptions.js');
const defaultPlugins = [...defaultOptions.plugins];

/**
 * Validates and applies blego options.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function loadOptions() {
  this.task('Load options', () => {
    this.tools.validateType('options', Object, this.options);
    this.options.plugins && this.tools.validateType('plugins', Array, this.options.plugins);

    this.options = _.merge({}, defaultOptions, this.options);
    this.options.plugins = defaultPlugins.concat(this.options.plugins);

    this.tools.validateTypeInArray('plugins', 'function', this.options.plugins);
    this.tools.validateType('paths', Object, this.options.paths);
    this.tools.validateType('paths.dest', 'string', this.options.paths.dest);
    this.tools.validateType('paths.static', 'string', this.options.paths.static);
    this.tools.validateType('paths.data', 'string', this.options.paths.data);
    this.tools.validateType('paths.config', 'string', this.options.paths.config);
    this.tools.validateType('paths.template', 'string', this.options.paths.template);
    this.tools.validateType('paths.partials', 'string', this.options.paths.partials);
  });
}

module.exports = loadOptions;
