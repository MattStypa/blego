/**
 * Copies the static files.
 *
 * @instance
 * @memberof Blego
 */
function copyStatic() {
  this.task('Copy static files', () => {
    this.tools.copy(this.internal.paths.static, this.internal.paths.dest);
  });
}

module.exports = copyStatic;
