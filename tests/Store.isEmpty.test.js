describe('Store.isEmpty', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Checks if Store is empty', () => {
    const emptyStore = new Store([ ]);
    const store = new Store([
      new Record('1', {}),
    ]);

    expect(emptyStore.isEmpty()).toEqual(true);
    expect(store.isEmpty()).toEqual(false);
  });
});
