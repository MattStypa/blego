describe('blego.Store.dd', () => {
  const Blego = require('Blego.js');
  let blego;
  let consoleLog;
  let processExit;

  beforeEach(() => {
    consoleLog = console.log = jest.fn();
    process.exit = processExit = jest.fn();
    blego = new Blego();
  });

  it('Writes the Records to console', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    store.dd();

    expect(consoleLog.mock.calls.pop().pop().length).toEqual(3);
  });

  it('Stops the process', () => {
    const store = new blego.Store([]);

    store.dd();

    expect(processExit).toHaveBeenCalledWith(1);
  });
});
