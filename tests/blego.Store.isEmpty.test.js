describe('blego.Store.isEmpty', () => {
  const blego = require('Blego.js');

  it('Checks if Store is empty', () => {
    const emptyStore = new blego.Store([ ]);
    const store = new blego.Store([
      new blego.Record('1', {}),
    ]);

    expect(emptyStore.isEmpty()).toEqual(true);
    expect(store.isEmpty()).toEqual(false);
  });
});
