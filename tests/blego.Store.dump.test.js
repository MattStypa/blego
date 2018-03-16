describe('blego.Store.dump', () => {
  const Blego = require('Blego.js');
  let blego;
  let consoleLog;

  beforeEach(() => {
    consoleLog = console.log = jest.fn();
    blego = new Blego();
  });

  it('Writes the Records to console', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    store.dump();

    expect(consoleLog.mock.calls.pop().pop().length).toEqual(3);
  });
});
