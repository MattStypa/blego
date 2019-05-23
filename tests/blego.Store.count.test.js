describe('blego.Store.count', () => {
  const blego = require('Blego.js');

  it('Gets a count of Records in the store', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    expect(store.count()).toEqual(3);
  });
});
