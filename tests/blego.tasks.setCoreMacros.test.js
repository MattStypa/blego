describe('blego.tasks.setCoreMacros', () => {
  const blego = require('Blego.js');

  it('Sets macros', () => {
    blego.tasks.setCoreMacros();

    expect(blego.handlebars.helpers.dump).toEqual(blego.dump);
    expect(blego.handlebars.helpers.dd).toEqual(blego.dd);
  });
});
