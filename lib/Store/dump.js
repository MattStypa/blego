import { internals } from '../Store.js';

/**
 * Writes the records to the console
 * @returns {Store}
 */
function dump() {
  internals.get(this).collection.dump();

  return this;
}

export default dump;
