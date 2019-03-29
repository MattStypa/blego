describe('blego.partial', () => {
  const handlebars = require('handlebars');
  const tempDir = require('../tools/tempDir.js');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
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
