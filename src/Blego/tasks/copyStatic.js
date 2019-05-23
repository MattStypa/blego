/**
 * Copies the static files.
 *
 * @instance
 * @alias module:tasks.copyStatic
 */
function copyStatic() {
  this.task('Copy static files', () => {
    this.tools.copy(this.paths.static, this.paths.dest);
  });
}

module.exports = copyStatic;
