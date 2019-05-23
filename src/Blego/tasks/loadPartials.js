/**
 * Registers partials with Handlebars.
 *
 * @instance
 * @memberof Blego
 */
function loadPartials() {
  this.task('Load partials', () => {
    this.tools.parseDataDir(this.internal.paths.partials)
      .each((file) => this.handlebars.registerPartial(file.key, file.body));
  });
}

module.exports = loadPartials;
