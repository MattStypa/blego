import collect from 'collect.js';
import { internals } from '../Store.js';

/**
 * Gets a collection of Records.
 * @returns {collection}
 */
function collection() {
  return collect(internals.get(this).collection.all());
}

export default collection;
