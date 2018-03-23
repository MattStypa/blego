describe('blego.Store.isEmpty', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Checks if Store is empty', () => {
    const emptyStore = new blego.Store([ ]);
    const store = new blego.Store([
      new blego.Record('1', {}),
    ]);

    expect(emptyStore.isEmpty()).toEqual(true);
    expect(store.isEmpty()).toEqual(false);
  });
});
