const nodePath = require('path');

/**
 * Parses the data files.
 *
 * @instance
 * @alias module:tasks.loadData
 */
function loadData() {
  this.task('Load data', () => {
    const storePaths = this.tools.readDir(this.paths.data, '*', 'true').filter(this.tools.isDir);

    storePaths.forEach((storePath) => {
      const storeName = nodePath.parse(storePath).name;
      const records = this.tools.parseDataDir(storePath).map((record) => new this.Record(record.key, record.props));
      const store = new this.Store(records);
      this.store[storeName] = store.sortBy('key');
    });
  });
}

module.exports = loadData;
