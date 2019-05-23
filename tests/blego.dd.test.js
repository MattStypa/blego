describe('blego.dd', () => {
  const blego = require('Blego.js');

  beforeEach(() => {
    process.exit = jest.fn();
  });

  it('Writes to console', () => {
    blego.dd('message');

    expect(console.log).toHaveBeenLastCalledWith('message');
  });

  it('Stops the process', () => {
    blego.dd('');

    expect(process.exit).toHaveBeenCalledWith(1);
  })
});
