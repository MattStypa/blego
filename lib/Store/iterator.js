import { internals } from '../Store.js';

/**
 * Gets an iterator for the Store
 * @returns {object}
 */
function iterator() {
  const collection = internals.get(this).collection;
  let index = -1;

  function next() {
    index++;

    return {
      value: collection.get(index),
      done: index >= collection.count(),
    };
  }

  return { next };
}

export default iterator;
