/**
 * Registers Handlebars helpers.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function setCoreMacros() {
  this.task('Set core macros', () => {
    this.macro('dd', this.dd);
    this.macro('dump', this.dump);
  });
}

module.exports = setCoreMacros;
