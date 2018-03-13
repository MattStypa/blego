describe('blego.page', () => {
  const fs = require('fs');
  const mockFs = require('mock-fs');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    mockFs({
      'dist': {},
      'template': {
        'testTemplate.html': 'Hello {{data}}',
      },
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Creates a file from template and context', () => {
    blego.page('testPage.html', 'testTemplate.html', {data: 'World'});

    expect(fs.readFileSync('dist/testPage.html').toString()).toEqual('Hello World');
  });
});
