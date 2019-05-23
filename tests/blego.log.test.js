describe('blego.log', () => {
  const stripAnsi = require('strip-ansi');
  const blego = require('Blego.js');

  it('Writes to console', () => {
    blego.log('message');

    expect(stripAnsi(console.log.mock.calls.pop().pop())).toEqual('message');
  });
});
