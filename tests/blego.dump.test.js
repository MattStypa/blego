describe('blego.dump', () => {
  const Blego = require('Blego.js');
  let blego;
  let consoleLog;

  beforeEach(() => {
    console.log = consoleLog = jest.fn();
    blego = new Blego();
  });

  it('Writes to console', () => {
    blego.dump('message');

    expect(consoleLog).toHaveBeenLastCalledWith('message');
  });
});
