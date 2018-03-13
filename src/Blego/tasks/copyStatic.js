/**
 * Copies the static files.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function copyStatic() {
  this.task('Copy static files', () => {
    this.tools.copy(this.options.paths.static, this.options.paths.dest);
  });
}

module.exports = copyStatic;
