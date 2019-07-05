const nodePath = require('path');
const tempDir = require('jest/tempDir.js');
const mockExit = require('jest/mockExit.js');

describe('cli.build', () => {
  const build = require('lib/cli/build.js');
  const cliUtils = require('lib/cli/utils.js');

  const errorSpy = jest.spyOn(cliUtils, 'error');
  const printTraceAndDieSpy = jest.spyOn(cliUtils, 'printTraceAndDie');

  let blegoJsMock;
  let buildJsMock;

  beforeEach(() => {
    tempDir({
      'blego.js': '',
      'build.js': '',
      'fail.js': 'invalid syntax',
    });

    blegoJsMock = jest.fn();
    buildJsMock = jest.fn();

    jest.doMock(nodePath.resolve('blego.js'), blegoJsMock, {virtual: true});
    jest.doMock(nodePath.resolve('build.js'), buildJsMock, {virtual: true});
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Builds from default build file', () => {
    build();

    expect(blegoJsMock).toHaveBeenCalled();
  });

  it('Builds from given file', () => {
    build('build.js');

    expect(buildJsMock).toHaveBeenCalled();
  });

  it('Builds from given file without extension', () => {
    build('build');

    expect(buildJsMock).toHaveBeenCalled();
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
