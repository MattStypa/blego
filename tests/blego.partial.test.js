describe('blego.partial', () => {
  const mockFs = require('mock-fs');
  const handlebars = require('handlebars');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    mockFs({
      'template/partials/file.html': 'file content',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Registers a partial', () => {
    blego.partial('testPartial', 'file.html');

    expect(handlebars.partials.testPartial).toEqual('file content');
  });
});
