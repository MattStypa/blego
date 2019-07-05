describe('Store.reverse', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Reverts the order of Records', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const reversed = store.reverse().all();

    expect(reversed[0].key).toEqual('3');
    expect(reversed[1].key).toEqual('2');
    expect(reversed[2].key).toEqual('1');
  });
});
