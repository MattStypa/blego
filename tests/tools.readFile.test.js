import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import nodePath from 'path';
import fs from 'fs-extra';
import tempDir from '../test_utils/tempDir.js';
import throwingMock from '../test_utils/throwingMock.js';
import errors from '../lib/errors.js';
import readFile from '../lib/tools/readFile.js';

describe('tools.readFile', () => {

  const pathDoesNotExistSpy = vi.spyOn(errors, 'pathDoesNotExist');
  const notFileSpy = vi.spyOn(errors, 'notFile');
  const cantReadPathSpy = vi.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    tempDir('tools.readFile', {
      'fake/directory/file': 'file content',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Reads a file', () => {
    expect(readFile('fake/directory/file')).toEqual('file content');
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      readFile('fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/file'));
  });

  it('Throws if path is not a file', () => {
    expect(() => {
      readFile('fake/directory');
    }).toThrow();

    expect(notFileSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory'));
  });

  it('Throws if path cannot be read', () => {
    const original = fs.readFileSync;
    fs.readFileSync = throwingMock;

    expect(() => {
      readFile('fake/directory/file');
    }).toThrow();

    fs.readFileSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
