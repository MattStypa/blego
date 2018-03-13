const parseDataDir = require('../../tools/parseDataDir.js');

/**
 * Parses the config files.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function loadConfig() {
  this.task('Load config', () => {
    this.config = parseDataDir(this.options.paths.config).cast();
  });
}

module.exports = loadConfig;
