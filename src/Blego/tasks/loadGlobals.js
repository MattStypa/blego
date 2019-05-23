/**
 * Parses the globals files.
 *
 * @instance
 * @memberof Blego
 */
function loadGlobals() {
  this.task('Load globals', () => {
    this.global = this.tools.parseDataDir(this.internal.paths.globals).keyed();
  });
}

module.exports = loadGlobals;
