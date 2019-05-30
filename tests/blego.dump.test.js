describe('blego.dump', () => {
  const blego = require('core.js');

  it('Writes to console', () => {
    blego.dump('message');

    expect(console.log).toHaveBeenLastCalledWith('message');
  });
});
