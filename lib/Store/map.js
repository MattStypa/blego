/**
 * Gets array of Records processed by the given function.
 * @memberof Store
 * @param {function} fn Function to run for every Record.
 * @return {array}
 */
function map(fn) {
  return this.collection.map(fn).all();
}

module.exports = map;
