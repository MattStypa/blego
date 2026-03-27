import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.isEmpty', () => {

  it('Checks if Store is empty', () => {
    const emptyStore = new Store([ ]);
    const store = new Store([
      new Record('1', {}),
    ]);

    expect(emptyStore.isEmpty()).toEqual(true);
    expect(store.isEmpty()).toEqual(false);
  });
});
