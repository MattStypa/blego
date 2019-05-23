describe('blego.tasks.cleanUp', () => {
  const fs = require('fs-extra');
  const tempDir = require('../jest/tempDir.js');
  const blego = require('Blego.js');

  beforeEach(() => {
    tempDir({
      'dist/file': 'file content',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Clean up the destination directory', () => {
    blego.tasks.cleanUp();

    expect(fs.readdirSync('dist')).toEqual([]);
  });
});
