describe('Store.map', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets mapped array of the records', () => {
    const fn = jest.fn((record) => 'key:' + record.key);
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const mapped = store.map(fn);

    expect(mapped[0]).toEqual('key:1');
    expect(mapped[1]).toEqual('key:2');
    expect(mapped[2]).toEqual('key:3');
  });
});
