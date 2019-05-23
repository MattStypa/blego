describe('blego.Store.reverse', () => {
  const blego = require('Blego.js');

  it('Reverts the order of Records', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    const reversed = store.reverse().all();

    expect(reversed[0].key).toEqual('3');
    expect(reversed[1].key).toEqual('2');
    expect(reversed[2].key).toEqual('1');
  });
});
