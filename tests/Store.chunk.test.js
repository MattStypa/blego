describe('Store.chunk', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');

  it('Gets an array of array of specified length', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const chunks = store.chunk(2);

    expect(chunks.length).toEqual(2);
    expect(chunks[0].length).toEqual(2);
    expect(chunks[1].length).toEqual(1);
  });
});
