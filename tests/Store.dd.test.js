describe('Store.dd', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  beforeEach(() => {
    process.exit = jest.fn();
  });

  it('Writes the Records to console', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    store.dd();

    expect(console.log.mock.calls.pop().pop().items.length).toEqual(3);
  });

  it('Stops the process', () => {
    const store = new Store([]);

    store.dd();

    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
