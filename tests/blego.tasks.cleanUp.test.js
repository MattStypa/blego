describe('blego.tasks.cleanUp', () => {
  const fs = require('fs-extra');
  const tempDir = require('../tools/tempDir.js');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
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
