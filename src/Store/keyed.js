/**
 * Gets object representation of the Store.
 *
 * @instance
 * @memberof Store
 * @return {object}
 */
function keyed() {
  return this.collection.keyBy('key').all();
}

module.exports = keyed;
