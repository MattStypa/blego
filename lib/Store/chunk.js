/**
 * Gets array of arrays of requested size containing all the Records.
 * @instance
 * @memberof Store
 * @param {int} size Size of the sub arrays.
 * @return {array}
 */
function chunk(size) {
  return this.collection.chunk(size).toArray();
}

module.exports = chunk;
