const nodePath = require('path');
const fs = require('fs-extra');
const tempDir = require('jest/tempDir.js');
const throwingMock = require('jest/throwingMock.js');

describe('tools.cleanDir', () => {
  const errors = require('lib/errors.js');
  const cleanDir = require('lib/tools/cleanDir.js');

  const pathDoesNotExistSpy = jest.spyOn(errors, 'pathDoesNotExist');
  const notDirSpy = jest.spyOn(errors, 'notDir');
  const cantCleanSpy = jest.spyOn(errors, 'cantClean');

  beforeEach(() => {
    tempDir({
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Cleans a directory', () => {
    cleanDir('fake/directory');

    expect(fs.readdirSync('fake/directory')).toEqual([]);
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      cleanDir('fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/file'));
  });

  it('Throws if path is not a directory', () => {
    expect(() => {
      cleanDir('fake/directory/file');
    }).toThrow();

    expect(notDirSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });

  it('Throws if path cannot be cleaned', () => {
    const original = fs.emptyDirSync;
    fs.emptyDirSync = throwingMock;

    expect(() => {
      cleanDir('fake/directory');
    }).toThrow();

    fs.emptyDirSync = original;

    expect(cantCleanSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory'));
  });
});
