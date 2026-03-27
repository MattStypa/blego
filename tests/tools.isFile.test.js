import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import nodePath from 'path';
import fs from 'fs-extra';
import tempDir from '../test_utils/tempDir.js';
import throwingMock from '../test_utils/throwingMock.js';
import errors from '../lib/errors.js';
import isFile from '../lib/tools/isFile.js';

describe('tools.isFile', () => {

  const cantReadPathSpy = vi.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    tempDir('tools.isFile', {
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Checks if path is a file', () => {
    expect(isFile('fake/directory/file')).toEqual(true);
  });

  it('Checks if path is not a file', () => {
    expect(isFile('fake/directory')).toEqual(false);
    expect(isFile('fake/file')).toEqual(false);
  });

  it('Throws if path cannot be read', () => {
    const original = fs.statSync;
    fs.statSync = throwingMock;

    expect(() => {
      isFile('fake/directory/file');
    }).toThrow();

    fs.statSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });

});
