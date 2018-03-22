/**
 * Copies the static files.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function copyStatic() {
  this.task('Copy static files', () => {
    this.tools.copy(this.paths.static, this.paths.dest);
  });
}

module.exports = copyStatic;
