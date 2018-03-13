/**
 * Initializes plugins.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function loadPlugins() {
  if (this.options.plugins.length > 0) {
    this.task('Activate plugins', () => {
      this.options.plugins.forEach((plugin) => plugin(this));
    });
  }
}

module.exports = loadPlugins;
