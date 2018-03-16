describe('blego.tasks.loadPartials', () => {
  const mockFs = require('mock-fs');
  const handlebars = require('handlebars');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    new blego.Store([]);
    mockFs({
      'template/partials/file.html': 'file content',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Loads partials', () => {
    blego.tasks.loadPartials();

    expect(handlebars.partials.file).toEqual('file content');
  });
});
