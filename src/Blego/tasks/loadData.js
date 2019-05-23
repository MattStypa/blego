const nodePath = require('path');

/**
 * Parses the data files.
 *
 * @instance
 * @memberof Blego
 */
function loadData() {
  this.task('Load data', () => {
    const storePaths = this.tools.readDir(this.internal.paths.data, '*', 'true').filter(this.tools.isDir);

    storePaths.forEach((storePath) => {
      const storeName = nodePath.parse(storePath).name;
      this.store[storeName] = this.tools.parseDataDir(storePath);
    });
  });
}

module.exports = loadData;
