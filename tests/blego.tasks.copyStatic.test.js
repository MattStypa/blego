describe('blego.tasks.copyStatic', () => {
  const fs = require('fs-extra');
  const tempDir = require('../tools/tempDir.js');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
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
