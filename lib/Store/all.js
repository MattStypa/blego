import { internals } from '../Store.js';

/**
 * Gets all Records from the Store
 * @returns {array}
 */
function all() {
  return internals.get(this).collection.all();
}

export default all;
