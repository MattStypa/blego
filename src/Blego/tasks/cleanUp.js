/**
 * Cleans the destination directory.
 * @instance
 * @alias module:tasks.cleanDir
 */
function cleanUp() {
  this.task('Clean destination directory', () => {
    const path = this.paths.dest;
    this.tools.exists(path) && this.tools.cleanDir(path);
  });
}

module.exports = cleanUp;
