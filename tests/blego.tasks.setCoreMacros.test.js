describe('blego.tasks.setCoreMacros', () => {
  const handlebars = require('handlebars');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Sets macros', () => {
    blego.tasks.setCoreMacros();

    expect(handlebars.helpers.dump).toEqual(blego.dump);
    expect(handlebars.helpers.dd).toEqual(blego.dd);
  });
});
