describe('blego.Store.get', () => {
  const blego = require('Blego.js');

  it('Gets the record with specified key', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    expect(store.get('2').key).toEqual('2');
  });

  it('Gets undefined if the key does not exist', () => {
    const store = new blego.Store([]);

    expect(store.get('2')).toEqual(null);
  });
});
