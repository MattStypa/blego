/**
 * Cleans the destination directory.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function cleanUp() {
  this.task('Clean destination directory', () => {
    const path = this.internal.paths.dest;
    this.tools.exists(path) && this.tools.cleanDir(path);
  });
}

module.exports = cleanUp;
