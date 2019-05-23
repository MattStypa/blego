describe('blego.Store.dd', () => {
  const blego = require('Blego.js');

  beforeEach(() => {
    process.exit = jest.fn();
  });

  it('Writes the Records to console', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    store.dd();

    expect(console.log.mock.calls.pop().pop().items.length).toEqual(3);
  });

  it('Stops the process', () => {
    const store = new blego.Store([]);

    store.dd();

    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
