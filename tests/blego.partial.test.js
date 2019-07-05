const tempDir = require('jest/tempDir.js');

describe('blego.partial', () => {
  const blego = require('core.js');
  const handlebars = require('lib/handlebars.js');

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

    expect(handlebars.partials.testPartial).toEqual('file content');
  });
});
