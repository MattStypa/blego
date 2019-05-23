describe('blego.Store.map', () => {
  const blego = require('Blego.js');

  it('Gets mapped array of the records', () => {
    const fn = jest.fn((record) => 'key:' + record.key);
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    const mapped = store.map(fn);

    expect(mapped[0]).toEqual('key:1');
    expect(mapped[1]).toEqual('key:2');
    expect(mapped[2]).toEqual('key:3');
  });
});
