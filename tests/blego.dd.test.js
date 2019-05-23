describe('blego.dd', () => {
  const Blego = require('Blego.js');
  let blego;
  let consoleLog;
  let processExit;

  beforeEach(() => {
    console.log = consoleLog = jest.fn();
    process.exit = processExit = jest.fn();
    blego = new Blego();
  });

  it('Writes to console', () => {
    blego.dd('message');

    expect(consoleLog).toHaveBeenLastCalledWith('message');
  });

  it('Stops the process', () => {
    blego.dd('');

    expect(processExit).toHaveBeenCalledWith(1);
  })
});
