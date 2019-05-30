describe('Store.keyed', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets an object with Record keys as property names', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    expect(Object.keys(store.keyed())).toEqual(['1', '2', '3']);
  });
});
