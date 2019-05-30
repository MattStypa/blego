describe('Store.dump', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Writes the Records to console', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    store.dump();

    expect(console.log.mock.calls.pop().pop().items.length).toEqual(3);
  });
});
