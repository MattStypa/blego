describe('blego.tasks.copyStatic', () => {
  const fs = require('fs-extra');
  const mockFs = require('mock-fs');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    mockFs({
      'dist': {},
      'static/file': '',
      'static/directory/file': '',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Copies static directory to destination directory', () => {
    blego.tasks.copyStatic();

    expect(fs.readdirSync('dist')).toEqual(['directory', 'file']);
    expect(fs.readdirSync('dist/directory')).toEqual(['file']);
  });
});
