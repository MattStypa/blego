describe('blego.task', () => {
  const handlebars = require('handlebars');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Executes a task', () => {
    const macro = jest.fn();
    blego.macro('macro', macro);

    expect(handlebars.helpers.macro).toEqual(macro);
  });
});
