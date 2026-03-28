/**
 * Gets an array with the results of calling provided function on every Record
 * @param {function} fn
 * @return {array}
 */
function map(fn) {
  return this.collection.map(fn).all();
}

export default map;
