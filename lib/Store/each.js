import { internals } from '../Store.js';

/**
 * Runs a function for every Record
 * @param {function} fn
 * @returns {Store}
 */
function each(fn) {
  internals.get(this).collection.each(fn);

  return this;
}

export default each;
