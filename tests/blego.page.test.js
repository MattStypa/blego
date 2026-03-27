import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import nodePath from 'path';
import fs from 'fs-extra';
import tempDir from '../test_utils/tempDir.js';
import blego from '../core.js';
import errors from '../lib/errors.js';

describe('blego.page', () => {

  const pathExistsSpy = vi.spyOn(errors, 'pathExists');
  const handlebarsSpy = vi.spyOn(errors, 'handlebars');

  beforeEach(() => {
    tempDir('blego.page', {
      'globals': {},
      'data': {},
      'static': {},
      'template/file.html': 'Hello {{data}}',
      'dist': {},
    });

    blego.init();
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Creates a file from template and context', () => {
    blego.page('testPage.html', 'file.html', {data: 'World'});

    expect(fs.readFileSync('dist/testPage.html').toString()).toEqual('Hello World');
  });

  it('Throws if file already exists', () => {
    blego.page('testPage.html', 'file.html', {data: 'World'});

    expect(() => {
      blego.page('testPage.html', 'file.html', {data: 'World'});
    }).toThrow();

    expect(pathExistsSpy).toHaveBeenCalledWith(nodePath.resolve('dist/testPage.html'));
  });

  it('Translates Handlebars errors', () => {
    expect(() => {
      blego.page('testPage.html', 'no-template', {});
    }).toThrow();

    expect(handlebarsSpy).toHaveBeenCalledWith(expect.not.stringContaining('partial'));
  });
});
