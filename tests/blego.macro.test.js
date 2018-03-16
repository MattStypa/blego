describe('blego.macro', () => {
  const handlebars = require('handlebars');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Registers a helper', () => {
    const macro = jest.fn();
    blego.macro('macro', macro);

    expect(handlebars.helpers.macro).toEqual(macro);
  });
});
