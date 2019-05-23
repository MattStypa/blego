/**
 * Registers Handlebars helpers.
 *
 * @instance
 * @alias module:tasks.setCoreMacros
 */
function setCoreMacros() {
  this.task('Set core macros', () => {
    this.macro('dd', this.dd);
    this.macro('dump', this.dump);
  });
}

module.exports = setCoreMacros;
