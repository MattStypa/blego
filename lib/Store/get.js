/**
 * Gets a Record with the given key
 * @param {string} key
 * @return {Record}
 */
function get(key) {
  return this.collection.firstWhere('key', key);
}

module.exports = get;
