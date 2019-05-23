describe('blego.Store.take', () => {
  const blego = require('Blego.js');

  it('Gets an array of specified size from the front of the Store', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    const records = store.take(2);

    expect(records.length).toEqual(2);
  });
});
