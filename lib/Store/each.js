/**
 * Runs a function for every Record
 * @param {function} fn
 * @return {Store}
 */
function each(fn) {
  this.collection.each(fn);

  return this;
}

module.exports = each;
