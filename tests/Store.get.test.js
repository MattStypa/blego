describe('Store.get', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets the record with specified key', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    expect(store.get('2').key).toEqual('2');
  });

  it('Gets undefined if the key does not exist', () => {
    const store = new Store([]);

    expect(store.get('2')).toEqual(null);
  });
});
