import { internals } from '../Store.js';

/**
 * Gets an object representation of the Store
 * @returns {object}
 */
function keyed() {
  return internals.get(this).collection.keyBy('key').all();
}

export default keyed;
