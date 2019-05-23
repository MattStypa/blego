describe('blego.partial', () => {
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

  it('Registers a partial', () => {
    blego.partial('testPartial', 'file.html');

    expect(blego.handlebars.partials.testPartial).toEqual('file content');
  });
});
