import nodePath from 'path';
import fs from 'fs-extra';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import errors from '../lib/errors.js';
import cleanDir from '../lib/tools/cleanDir.js';
import tempDir from '../test_utils/tempDir.js';
import throwingMock from '../test_utils/throwingMock.js';

describe('tools.cleanDir', () => {
  const pathDoesNotExistSpy = vi.spyOn(errors, 'pathDoesNotExist');
  const notDirSpy = vi.spyOn(errors, 'notDir');
  const cantCleanSpy = vi.spyOn(errors, 'cantClean');

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
