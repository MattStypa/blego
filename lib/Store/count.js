import { internals } from '../Store.js';

/**
 * Gets the count of Records in the Store
 * @returns {int}
 */
function count() {
  return internals.get(this).collection.count();
}

export default count;
