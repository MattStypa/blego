const parseDataDir = require('../../tools/parseDataDir.js');

/**
 * Parses the globals files.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function loadGlobals() {
  this.task('Load globals', () => {
    this.global = parseDataDir(this.internal.paths.globals).keyed();
  });
}

module.exports = loadGlobals;
