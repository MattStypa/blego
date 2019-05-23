describe('blego.Store.dump', () => {
  const blego = require('Blego.js');

  it('Writes the Records to console', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    store.dump();

    expect(console.log.mock.calls.pop().pop().items.length).toEqual(3);
  });
});
