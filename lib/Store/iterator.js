/**
 * Gets an iterator for the Store
 * @return {object}
 */
function iterator() {
  const collection = this.collection;
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

module.exports = iterator;
