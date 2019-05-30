describe('Store.where', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets Store with Records having prop equal to value', () => {
    const store = new Store([
      new Record('1', {value: 'a'}),
      new Record('2', {value: 'b'}),
      new Record('3', {value: 'a'}),
    ]);

    const filtered = store.where('value', 'a').all();

    expect(filtered[0].key).toEqual('1');
    expect(filtered[1].key).toEqual('3');
  });

  it('Gets Store with Records having prop array that contain value', () => {
    const store = new Store([
      new Record('1', {value: ['a', 'b']}),
      new Record('2', {value: ['b', 'c']}),
      new Record('3', {value: ['a', 'c']}),
    ]);

    const filtered = store.where('value', 'a').all();

    expect(filtered[0].key).toEqual('1');
    expect(filtered[1].key).toEqual('3');
  });
});
