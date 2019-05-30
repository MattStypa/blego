describe('Store.all', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets all records from the store', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    expect(store.all().length).toEqual(3);
  });
});
