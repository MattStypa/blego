import nodePath from 'path';
import { globSync } from 'glob';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import errors from '../lib/errors.js';
import readDir from '../lib/tools/readDir.js';
import tempDir from '../test_utils/tempDir.js';
import throwingMock from '../test_utils/throwingMock.js';

vi.mock('glob', async (importActual) => {
  const actual = await importActual();

  return {
    ...actual,
    globSync: vi.fn((...args) => actual.globSync(...args)),
  };
});

describe('tools.readDir', () => {
  const pathDoesNotExistSpy = vi.spyOn(errors, 'pathDoesNotExist');
  const notDirSpy = vi.spyOn(errors, 'notDir');
  const cantReadPathSpy = vi.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    vi.resetAllMocks();

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
    globSync.mockImplementation(throwingMock);

    expect(() => {
      readDir('fake/directory1');
    }).toThrow();

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1'));
  });
});
