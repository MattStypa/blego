import { vi } from 'vitest';
import tempDir from '../jest_utils/tempDir.js';
import mockExit from '../jest_utils/mockExit.js';
import build from '../lib/cli/build.js';
import cliUtils from '../lib/cli/utils.js';

describe('cli.build', () => {

  const errorSpy = vi.spyOn(cliUtils, 'error');
  const printTraceAndDieSpy = vi.spyOn(cliUtils, 'printTraceAndDie');

  beforeEach(() => {
    tempDir({
      'blego.js': 'global.__blegoBuilt = (global.__blegoBuilt || 0) + 1;',
      'build.js': 'global.__buildBuilt = (global.__buildBuilt || 0) + 1;',
      'build-alt.js': 'global.__buildAltBuilt = (global.__buildAltBuilt || 0) + 1;',
      'fail.js': 'invalid syntax',
    });
    global.__blegoBuilt = 0;
    global.__buildBuilt = 0;
    global.__buildAltBuilt = 0;
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Builds from default build file', () => {
    build();

    expect(global.__blegoBuilt).toEqual(1);
  });

  it('Builds from given file', () => {
    build('build.js');

    expect(global.__buildBuilt).toEqual(1);
  });

  it('Builds from given file without extension', () => {
    build('build-alt');

    expect(global.__buildAltBuilt).toEqual(1);
  });

  it('Dies if the given file does not exist', () => {
    const exitMock = mockExit(() => {
      build('test');
    });

    expect(errorSpy).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(1);
  });

  it('Parsers trace if the build fails', () => {
    const exitMock = mockExit(() => {
      build('fail');
    });

    expect(printTraceAndDieSpy).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(1);
  });
});
