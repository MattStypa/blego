describe('blego.Store.cast', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Gets an object with Record keys as property names', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    expect(Object.keys(store.cast())).toEqual(['1', '2', '3']);
  });
});
