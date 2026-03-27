import { vi } from 'vitest';
import tempDir from '../test_utils/tempDir.js';
import mockExit from '../test_utils/mockExit.js';
import build from '../lib/cli/build.js';
import cliUtils from '../lib/cli/utils.js';
import importSync from '../lib/tools/importSync.cjs';

vi.mock('../lib/tools/importSync.cjs');

describe('cli.build', () => {
  const errorSpy = vi.spyOn(cliUtils, 'error');
  const printTraceAndDieSpy = vi.spyOn(cliUtils, 'printTraceAndDie');

  beforeEach(() => {
    vi.resetAllMocks();

    tempDir({
      'blego.js': '',
      'build.js': '',
      'fail.js': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Builds from default build file', () => {
    build();

    expect(importSync).toHaveBeenCalledWith(expect.stringMatching(/\/blego\.js$/));
  });

  it('Builds from given file', () => {
    build('build.js');

    expect(importSync).toHaveBeenCalledWith(expect.stringMatching(/\/build\.js$/));
  });

  it('Builds from given file without extension', () => {
    build('build');

    expect(importSync).toHaveBeenCalledWith(expect.stringMatching(/\/build\.js$/));
  });

  it('Dies if the given file does not exist', () => {
    const exitMock = mockExit(() => {
      build('test');
    });

    expect(errorSpy).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(1);
  });

  it('Parsers trace if the build fails', () => {
    importSync.mockImplementation(() => {
      throw new Error('Build failed');
    });

    const exitMock = mockExit(() => {
      build('fail');
    });

    expect(printTraceAndDieSpy).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(1);
  });
});
