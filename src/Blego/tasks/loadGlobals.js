/**
 * Parses the globals files.
 * @instance
 * @alias module:tasks.loadGlobals
 */
function loadGlobals() {
  this.task('Load globals', () => {
    const records = this.tools.parseDataDir(this.paths.globals).map((record) => new this.Record(record.key, record.props));
    const store = new this.Store(records);
    this.global = store.sortBy('key').keyed();
  });
}

module.exports = loadGlobals;
