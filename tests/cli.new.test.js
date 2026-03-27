import childProcess from 'child_process';
import fs from 'fs-extra';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import cliNew from '../lib/cli/new.js';
import cliUtils from '../lib/cli/utils.js';
import mockExit from '../test_utils/mockExit.js';
import tempDir from '../test_utils/tempDir.js';

describe('cli.new', () => {
  const cliErrorSpy = vi.spyOn(cliUtils, 'error');

  beforeEach(() => {
    childProcess.spawnSync = vi.fn();

    tempDir({
      'exists': null,
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Creates a new Blego project', () => {
    cliNew('test');

    expect(fs.readdirSync('.')).toEqual(expect.arrayContaining(['blego.js']));
    expect(fs.readdirSync('.')).toEqual(expect.arrayContaining(['.gitignore']));
  });

  it('Dies if the path already exists', () => {
    mockExit(() => {
      cliNew('exists');
    });

    expect(cliErrorSpy).toHaveBeenCalled();
  });
});
