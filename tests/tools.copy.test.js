const nodePath = require('path');
const fs = require('fs-extra');
const tempDir = require('jest/tempDir.js');
const throwingMock = require('jest/throwingMock.js');

describe('tools.copy', () => {
  const errors = require('lib/errors.js');
  const copy = require('lib/tools/copy.js');

  const pathDoesNotExistSpy = jest.spyOn(errors, 'pathDoesNotExist');
  const pathExistsSpy = jest.spyOn(errors, 'pathExists');
  const cantCopySpy = jest.spyOn(errors, 'cantCopy');

  beforeEach(() => {
    tempDir({
      'fake/directory1/file1': 'file content',
      'fake/directory1/file2': '',
      'fake/directory1/directory2': null,
      'fake/directory3/file3': '',
      'fake/directory4/file1': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Copies a file', () => {
    copy('fake/directory1/file1', 'fake/directory1/file3');
    copy('fake/directory1/file1', 'fake/directory3/file1');

    expect(fs.readdirSync('fake/directory1')).toEqual(['directory2', 'file1', 'file2', 'file3']);
    expect(fs.readdirSync('fake/directory3')).toEqual(['file1', 'file3']);
    expect(fs.readFileSync('fake/directory1/file3').toString()).toEqual(fs.readFileSync('fake/directory1/file1').toString());
    expect(fs.readFileSync('fake/directory3/file1').toString()).toEqual(fs.readFileSync('fake/directory1/file1').toString());
  });

  it('Copies a file to a directory', () => {
    copy('fake/directory1/file1', 'fake/directory3');

    expect(fs.readdirSync('fake/directory3')).toEqual(['file1', 'file3']);
    expect(fs.readFileSync('fake/directory3/file1').toString()).toEqual(fs.readFileSync('fake/directory1/file1').toString())
  });

  it('Copies a directory', () => {
    copy('fake/directory1', 'fake/directory5');

    expect(fs.readdirSync('fake/directory5')).toEqual(['directory2', 'file1', 'file2']);
  });

  it('Copies a directory to a directory', () => {
    copy('fake/directory1', 'fake/directory3');

    expect(fs.readdirSync('fake/directory3')).toEqual(['directory2', 'file1', 'file2', 'file3']);
  });

  it('Throws if source does not exist', () => {
    expect(() => {
      copy('fake/directory1/file0', 'fake/directory1/copy0');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1/file0'));
  });

  it('Throws if destination file already exists', () => {
    expect(() => {
      copy('fake/directory1/file1', 'fake/directory1/file2');
    }).toThrow();

    expect(pathExistsSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1/file2'));
  });

  it('Throws if destination directory already contains a source file', () => {
    expect(() => {
      copy('fake/directory1/file1', 'fake/directory4');
    }).toThrow();

    expect(pathExistsSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory4/file1'));
  });

  it('Throws if destination directory already contains a file from the source directory', () => {
    expect(() => {
      copy('fake/directory1', 'fake/directory4');
    }).toThrow();

    expect(pathExistsSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory4/file1'));
  });

  it('Throws if copy fails', () => {
    const original = fs.copySync;
    fs.copySync = throwingMock;

    expect(() => {
      copy('fake/directory1/file1', 'fake/directory1/file3');
    }).toThrow();

    fs.copySync = original;

    expect(cantCopySpy).toHaveBeenCalledWith(
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file3')
    );
  });
});
