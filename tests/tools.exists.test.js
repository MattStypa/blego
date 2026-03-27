import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import nodePath from 'path';
import fs from 'fs-extra';
import tempDir from '../test_utils/tempDir.js';
import throwingMock from '../test_utils/throwingMock.js';
import errors from '../lib/errors.js';
import exists from '../lib/tools/exists.js';

describe('tools.exists', () => {

  const cantReadPathSpy = vi.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    tempDir({
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Checks if path exists', () => {
    expect(exists('fake/directory')).toEqual(true);
    expect(exists('fake/directory/file')).toEqual(true);
  });

  it('Checks if path does not exist', () => {
    expect(exists('fake/file')).toEqual(false);
  });

  it('Throws if path cannot be read', () => {
    const original = fs.existsSync;
    fs.existsSync = throwingMock;

    expect(() => {
      exists('fake/directory/file');
    }).toThrow();

    fs.existsSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
