const defaultPaths = require('../defaultPaths.js');

/**
 * Validates and applies blego paths.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function setPaths() {
  this.task('Set paths', () => {
    this.tools.validateType('paths', Object, this.paths);

    this.paths = Object.assign({}, defaultPaths, this.paths);

    this.tools.validateType('paths.dest', 'string', this.paths.dest);
    this.tools.validateType('paths.static', 'string', this.paths.static);
    this.tools.validateType('paths.data', 'string', this.paths.data);
    this.tools.validateType('paths.globals', 'string', this.paths.globals);
    this.tools.validateType('paths.template', 'string', this.paths.template);
    this.tools.validateType('paths.partials', 'string', this.paths.partials);
  });
}

module.exports = setPaths;
