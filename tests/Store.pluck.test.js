describe('Store.pluck', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets all values in specified prop', () => {
    const store = new Store([
      new Record('1', {value: 'a'}),
      new Record('2', {value: 'b'}),
      new Record('3', {value: ['b', 'c']}),
      new Record('4', {}),
    ]);

    expect(store.pluck('value')).toEqual(['a', 'b', 'b', 'c']);
  });
});
