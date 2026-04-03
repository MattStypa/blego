import { internals } from '../Store.js';

/**
 * Checks if the Store is empty
 * @returns {boolean}
 */
function isEmpty() {
  return internals.get(this).collection.isEmpty();
}

export default isEmpty;
