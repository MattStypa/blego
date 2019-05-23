/**
 * Runs built-in tasks.
 * @instance
 * @memberof Blego
 */
function init() {
  this.tasks.setCoreMacros();
  this.tasks.loadGlobals();
  this.tasks.loadPartials();
  this.tasks.loadData();
  this.tasks.cleanUp();
  this.tasks.copyStatic();
}

module.exports = init;
