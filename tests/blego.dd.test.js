describe('blego.dd', () => {
  const blego = require('core.js');

  beforeEach(() => {
    process.exit = jest.fn();
  });

  it('Writes to console', () => {
    blego.dd('message');

    expect(console.log).toHaveBeenLastCalledWith('message');
  });

  it('Stops the process', () => {
    blego.dd('message');

    expect(process.exit).toHaveBeenCalledWith(1);
  })
});
