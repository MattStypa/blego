/**
 * Runs built-in tasks.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function init() {
  this.tasks.setCoreMacros();
  this.tasks.loadConfig();
  this.tasks.loadPartials();
  this.tasks.loadData();
  this.tasks.cleanUp();
  this.tasks.copyStatic();
}

module.exports = init;
