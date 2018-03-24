/**
 * Checks if the Store is empty.
 *
 * @instance
 * @memberof Store
 * @return {boolean}
 */
function isEmpty() {
  return this.collection.isEmpty();
}

module.exports = isEmpty;
