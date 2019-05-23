describe('blego.tools.cleanDir', () => {
  const nodePath = require('path');
  const fs = require('fs-extra');
  const tempDir = require('../jest/tempDir.js');
  const throwingMock = require('../jest/throwingMock.js');
  const blego = require('Blego.js');
  const pathDoesNotExistSpy = jest.spyOn(blego.tools.errors, 'pathDoesNotExist');
  const notDirSpy = jest.spyOn(blego.tools.errors, 'notDir');
  const cantCleanSpy = jest.spyOn(blego.tools.errors, 'cantClean');

  beforeEach(() => {
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
      blego.tools.cleanDir('fake/directory/file');
    }).toThrow();

    expect(notDirSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });

  it('Throws if path cannot be cleaned', () => {
    const original = fs.emptyDirSync;
    fs.emptyDirSync = throwingMock;

    expect(() => {
      blego.tools.cleanDir('fake/directory');
    }).toThrow();

    fs.emptyDirSync = original;

    expect(cantCleanSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory'));
  });
});
