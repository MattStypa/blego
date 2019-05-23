describe('blego.tools.readDir', () => {
  const nodePath = require('path');
  const glob = require('glob');
  const tempDir = require('../jest/tempDir.js');
  const throwingMock = require('../jest/throwingMock.js');
  const blego = require('Blego.js');
  const pathDoesNotExistSpy = jest.spyOn(blego.tools.errors, 'pathDoesNotExist');
  const notDirSpy = jest.spyOn(blego.tools.errors, 'notDir');
  const cantReadPathSpy = jest.spyOn(blego.tools.errors, 'cantReadPath');

  beforeEach(() => {
    pathDoesNotExistSpy.mockClear();
    notDirSpy.mockClear();
    cantReadPathSpy.mockClear();
    tempDir({
      'fake/directory1/.hidden': '',
      'fake/directory1/file1': '',
      'fake/directory1/file2': '',
      'fake/directory2/file1': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Reads a directory', () => {
    expect(blego.tools.readDir('fake')).toEqual([
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file2'),
      nodePath.resolve('fake/directory2/file1'),
    ]);
  });

  it('Reads a directory for glob matches', () => {
    expect(blego.tools.readDir('fake', '**/*1')).toEqual([
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory2/file1'),
    ]);
  });

  it('Reads a directory including subdirectories', () => {
    expect(blego.tools.readDir('fake', '**/*', true)).toEqual([
      nodePath.resolve('fake/directory1'),
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file2'),
      nodePath.resolve('fake/directory2'),
      nodePath.resolve('fake/directory2/file1'),
    ]);
  });

  it('Reads a directory including dot files', () => {
    expect(blego.tools.readDir('fake/directory1', '**/*', true, true)).toEqual([
      nodePath.resolve('fake/directory1/.hidden'),
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file2'),
    ]);
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      blego.tools.readDir('fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/file'));
  });

  it('Throws if path is not a directory', () => {
    expect(() => {
      blego.tools.readDir('fake/directory1/file1');
    }).toThrow();

    expect(notDirSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1/file1'));
  });

  it('Throws if path cannot be read', () => {
    const original = glob.sync;
    glob.sync = throwingMock;

    expect(() => {
      blego.tools.readDir('fake/directory1');
    }).toThrow();

    glob.sync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1'));
  });
});
