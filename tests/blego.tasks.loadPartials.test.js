describe('blego.tasks.loadPartials', () => {
  const tempDir = require('../jest/tempDir.js');
  const blego = require('Blego.js');

  beforeEach(() => {
    tempDir({
      'template/partials/file.html': 'file content',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Loads partials', () => {
    blego.tasks.loadPartials();

    expect(blego.handlebars.partials.file).toEqual('file content');
  });
});
