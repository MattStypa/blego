describe('Store.take', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets an array of specified size from the front of the Store', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const records = store.take(2);

    expect(records.length).toEqual(2);
  });
});
