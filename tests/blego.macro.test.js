describe('blego.macro', () => {
  const blego = require('core.js');
  const handlebars = require('lib/handlebars.js');

  it('Registers a helper', () => {
    const macro = jest.fn();
    blego.macro('macro', macro);

    expect(handlebars.helpers.macro).toEqual(macro);
  });
});
