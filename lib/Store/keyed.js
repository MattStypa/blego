/**
 * Gets an object representation of the Store
 * @return {object}
 */
function keyed() {
  return this.collection.keyBy('key').all();
}

module.exports = keyed;
