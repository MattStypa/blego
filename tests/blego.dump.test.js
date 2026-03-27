import blego from '../core.js';

describe('blego.dump', () => {

  it('Writes to console', () => {
    blego.dump('message');

    expect(console.log).toHaveBeenLastCalledWith('message');
  });
});
