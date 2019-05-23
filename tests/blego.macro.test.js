describe('blego.macro', () => {
  const blego = require('Blego.js');

  it('Registers a helper', () => {
    const macro = jest.fn();
    blego.macro('macro', macro);

    expect(blego.handlebars.helpers.macro).toEqual(macro);
  });
});
