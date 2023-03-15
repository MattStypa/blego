const nodePath = require('path');
const glob = require('glob');
const tempDir = require('jest_utils/tempDir.js');
const throwingMock = require('jest_utils/throwingMock.js');

describe('tools.readDir', () => {
  const errors = require('lib/errors.js');
  const readDir = require('lib/tools/readDir.js');

  const pathDoesNotExistSpy = jest.spyOn(errors, 'pathDoesNotExist');
  const notDirSpy = jest.spyOn(errors, 'notDir');
  const cantReadPathSpy = jest.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
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
    expect(readDir('fake')).toEqual([
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file2'),
      nodePath.resolve('fake/directory2/file1'),
    ]);
  });

  it('Reads a directory for glob matches', () => {
    expect(readDir('fake', '**/*1')).toEqual([
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory2/file1'),
    ]);
  });

  it('Reads a directory including subdirectories', () => {
    expect(readDir('fake', '**/*', true)).toEqual([
      nodePath.resolve('fake/directory1'),
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file2'),
      nodePath.resolve('fake/directory2'),
      nodePath.resolve('fake/directory2/file1'),
    ]);
  });

  it('Reads a directory including dot files', () => {
    expect(readDir('fake/directory1', '**/*', true, true)).toEqual([
      nodePath.resolve('fake/directory1/.hidden'),
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file2'),
    ]);
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      readDir('fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/file'));
  });

  it('Throws if path is not a directory', () => {
    expect(() => {
      readDir('fake/directory1/file1');
    }).toThrow();

    expect(notDirSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1/file1'));
  });

  it('Throws if path cannot be read', () => {
    const original = glob.sync;
    glob.sync = throwingMock;

    expect(() => {
      readDir('fake/directory1');
    }).toThrow();

    glob.sync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1'));
  });
});
