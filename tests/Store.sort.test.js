describe('Store.sort', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets Store sorted by function', () => {
    const store = new Store([
      new Record('1', {value: 100}),
      new Record('2', {value: 20}),
      new Record('3', {value: 3}),
    ]);

    const sorted = store.sort((a, b) => {
      return a.value - b.value;
    }).all();

    expect(sorted[0].key).toEqual('3');
    expect(sorted[1].key).toEqual('2');
    expect(sorted[2].key).toEqual('1');
  });
});
