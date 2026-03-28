/**
 * Gets an array with the results of calling the provided function on every Record
 * @param {function} fn
 * @returns {array}
 */
function map(fn) {
  return this.collection.map(fn).all();
}

export default map;
