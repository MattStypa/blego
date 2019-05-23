describe('blego.Store.keyed', () => {
  const blego = require('Blego.js');

  it('Gets an object with Record keys as property names', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    expect(Object.keys(store.keyed())).toEqual(['1', '2', '3']);
  });
});
