describe('blego.tasks.cleanUp', () => {
  const fs = require('fs-extra');
  const mockFs = require('mock-fs');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    mockFs({
      'dist/file': 'file content',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Clean up the destination directory', () => {
    blego.tasks.cleanUp();

    expect(fs.readdirSync('dist')).toEqual([]);
  });
});
