describe('blego.Store.each', () => {
  const blego = require('Blego.js');

  it('Calls a function on each record', () => {
    const fn = jest.fn();
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    store.each(fn);

    expect(fn.mock.calls[0][0].key).toEqual('1');
    expect(fn.mock.calls[1][0].key).toEqual('2');
    expect(fn.mock.calls[2][0].key).toEqual('3');
  });
});
