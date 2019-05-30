describe('Store.filter', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets Store with Records filtered by function', () => {
    const store = new Store([
      new Record('1', {value: 'a'}),
      new Record('2', {value: 'b'}),
      new Record('3', {value: 'a'}),
    ]);

    const filtered = store.filter((record) => {
      return record.value === 'a';
    }).all();

    expect(filtered[0].key).toEqual('1');
    expect(filtered[1].key).toEqual('3');
  });
});
