/**
 * Gets Record with the given key.
 * @memberof Store
 * @param {string} key Record identifier.
 * @return {Record}
 */
function get(key) {
  return this.collection.firstWhere('key', key);
}

module.exports = get;
