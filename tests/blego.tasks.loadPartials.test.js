describe('blego.tasks.loadPartials', () => {
  const handlebars = require('handlebars');
  const tempDir = require('../tools/tempDir.js');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    new blego.Store([]);
    tempDir({
      'template/partials/file.html': 'file content',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Loads partials', () => {
    blego.tasks.loadPartials();

    expect(handlebars.partials.file).toEqual('file content');
  });
});
