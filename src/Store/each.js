/**
 * Dumps the records to the console.
 * @instance
 * @memberof Store
 * @param {function} fn Function to run for every Record.
 * @return {Store}
 */
function each(fn) {
  this.collection.each(fn);

  return this;
}

module.exports = each;
