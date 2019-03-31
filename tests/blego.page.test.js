describe('blego.page', () => {
  const nodePath = require('path');
  const fs = require('fs-extra');
  const tempDir = require('../jest/tempDir.js');
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  const pathExistsSpy = jest.spyOn(errors, 'pathExists');
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

  it('Throws if file already exists', () => {
    blego.page('testPage.html', 'testTemplate.html', {data: 'World'});

    expect(() => {
      blego.page('testPage.html', 'testTemplate.html', {data: 'World'});
    }).toThrow();

    expect(pathExistsSpy).toHaveBeenCalledWith(nodePath.resolve('dist/testPage.html'));
  });
});
