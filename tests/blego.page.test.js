const nodePath = require('path');
const fs = require('fs-extra');
const tempDir = require('jest/tempDir.js');

describe('blego.page', () => {
  const blego = require('core.js');
  const errors = require('lib/errors.js');

  const pathExistsSpy = jest.spyOn(errors, 'pathExists');

  beforeEach(() => {
    tempDir({
      'globals': {},
      'data': {},
      'static': {},
      'template/partials': {},
      'template/file.html': 'Hello {{data}}',
      'dist': {},
    });

    blego.init();
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Creates a file from template and context', () => {
    blego.page('testPage.html', 'file.html', {data: 'World'});

    expect(fs.readFileSync('dist/testPage.html').toString()).toEqual('Hello World');
  });

  it('Throws if file already exists', () => {
    blego.page('testPage.html', 'file.html', {data: 'World'});

    expect(() => {
      blego.page('testPage.html', 'file.html', {data: 'World'});
    }).toThrow();

    expect(pathExistsSpy).toHaveBeenCalledWith(nodePath.resolve('dist/testPage.html'));
  });
});
