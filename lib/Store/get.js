/**
 * Gets a Record with the given key
 * @param {string} key
 * @returns {Record}
 */
function get(key) {
  return this.collection.firstWhere('key', key);
}

export default get;
