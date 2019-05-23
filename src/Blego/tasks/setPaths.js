const defaultPaths = {
  'dest': './dist',
  'static': './static',
  'data': './data',
  'globals': './globals',
  'template': './template',
  'partials': './template/partials',
};

/**
 * Validates and applies blego paths.
 *
 * @instance
 * @memberof Blego
 */
function setPaths() {
  this.task('Set paths', () => {
    this.tools.validateType('paths', Object, this.internal.paths);

    this.internal.paths = Object.assign({}, defaultPaths, this.internal.paths);

    this.tools.validateType('paths.dest', 'string', this.internal.paths.dest);
    this.tools.validateType('paths.static', 'string', this.internal.paths.static);
    this.tools.validateType('paths.data', 'string', this.internal.paths.data);
    this.tools.validateType('paths.globals', 'string', this.internal.paths.globals);
    this.tools.validateType('paths.template', 'string', this.internal.paths.template);
    this.tools.validateType('paths.partials', 'string', this.internal.paths.partials);
  });
}

module.exports = setPaths;
