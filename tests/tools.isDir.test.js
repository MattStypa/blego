import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import nodePath from 'path';
import fs from 'fs-extra';
import tempDir from '../test_utils/tempDir.js';
import throwingMock from '../test_utils/throwingMock.js';
import errors from '../lib/errors.js';
import isDir from '../lib/tools/isDir.js';

describe('tools.isDir', () => {

  const cantReadPathSpy = vi.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    tempDir('tools.isDir', {
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Checks if path is a directory', () => {
    expect(isDir('fake/directory')).toEqual(true);
  });

  it('Checks if path is not a directory', () => {
    expect(isDir('fake/directory/file')).toEqual(false);
    expect(isDir('fake/file')).toEqual(false);
  });

  it('Throws if path cannot be read', () => {
    const original = fs.statSync;
    fs.statSync = throwingMock;

    expect(() => {
      isDir('fake/directory/file');
    }).toThrow();

    fs.statSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
