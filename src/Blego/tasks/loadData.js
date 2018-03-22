const nodePath = require('path');
const parseDataDir = require('../../tools/parseDataDir.js');

/**
 * Parses the data files.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function loadData() {
  this.task('Load data', () => {
    const storePaths = this.tools.readDir(this.paths.data, '*', 'true').filter(this.tools.isDir);

    storePaths.forEach((storePath) => {
      const storeName = nodePath.parse(storePath).name;
      this.store[storeName] = parseDataDir(storePath);
    });
  });
}

module.exports = loadData;
