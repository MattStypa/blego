describe('blego.tasks.copyStatic', () => {
  const fs = require('fs-extra');
  const tempDir = require('../jest/tempDir.js');
  const blego = require('Blego.js');

  beforeEach(() => {
    tempDir({
      'dist': null,
      'static/file': '',
      'static/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Copies static directory to destination directory', () => {
    blego.tasks.copyStatic();

    expect(fs.readdirSync('dist')).toEqual(['directory', 'file']);
    expect(fs.readdirSync('dist/directory')).toEqual(['file']);
  });
});
