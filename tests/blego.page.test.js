describe('blego.page', () => {
  const fs = require('fs-extra');
  const tempDir = require('../tools/tempDir.js');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();

    tempDir({
      'template/testTemplate.html': 'Hello {{data}}',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Creates a file from template and context', () => {
    blego.page('testPage.html', 'testTemplate.html', {data: 'World'});

    expect(fs.readFileSync('dist/testPage.html').toString()).toEqual('Hello World');
  });
});
