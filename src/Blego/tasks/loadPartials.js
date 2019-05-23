/**
 * Registers partials with Handlebars.
 * @instance
 * @alias module:tasks.loadPartials
 */
function loadPartials() {
  this.task('Load partials', () => {
    this.tools.parseDataDir(this.paths.partials).forEach((file) => this.handlebars.registerPartial(file.key, file.props.body));
  });
}

module.exports = loadPartials;
