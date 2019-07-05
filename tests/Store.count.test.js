describe('Store.count', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets a count of Records in the store', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    expect(store.count()).toEqual(3);
  });
});
