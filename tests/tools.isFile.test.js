import nodePath from 'path';
import fs from 'fs-extra';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import errors from '../lib/errors';
import isFile from '../lib/tools/isFile';
import tempDir from '../test_utils/tempDir';
import throwingMock from '../test_utils/throwingMock';

describe('tools.isFile', () => {
  const cantReadPathSpy = vi.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    tempDir({
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
