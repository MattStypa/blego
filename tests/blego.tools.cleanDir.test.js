describe('blego.tools.cleanDir', () => {
  const nodePath = require('path');
  const fs = require('fs-extra');
  const tempDir = require('../tools/tempDir.js');
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  const pathDoesNotExistSpy = jest.spyOn(errors, 'pathDoesNotExist');
  const notDirSpy = jest.spyOn(errors, 'notDir');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    pathDoesNotExistSpy.mockClear();
    notDirSpy.mockClear();
    blego = new Blego();
    tempDir({
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Cleans a directory', () => {
    blego.tools.cleanDir('fake/directory');

    expect(fs.readdirSync('fake/directory')).toEqual([]);
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      blego.tools.cleanDir('fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/file'));
  });

  it('Throws if path is not a directory', () => {
    expect(() => {
      blego.tools.readDir('fake/directory/file');
    }).toThrow();

    expect(notDirSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
