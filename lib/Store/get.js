import { internals } from '../Store.js';

/**
 * Gets a Record with the given key
 * @param {string} key
 * @returns {Record}
 */
function get(key) {
  return internals.get(this).map[key];
}

export default get;
