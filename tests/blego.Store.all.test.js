describe('blego.Store.all', () => {
  const blego = require('Blego.js');

  it('Gets all records from the store', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    expect(store.all().length).toEqual(3);
  });
});
