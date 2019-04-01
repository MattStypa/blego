describe('cli.build', () => {
  const nodePath = require('path');
  const tempDir = require('../jest/tempDir.js');
  const mockExit = require('../jest/mockExit.js');
  const throwingMock = require('../jest/throwingMock.js');
  const build = require('cli/build.js');
  const cliUtils = require('cli/utils.js');
  const cliErrorSpy = jest.spyOn(cliUtils, 'error');
  let blegoJsMock;
  let buildJsMock;

  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    tempDir({
      'blego.js': '',
      'build.js': '',
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
    const mock = mockExit(() => {
      build('test');
    });

    expect(cliErrorSpy).toHaveBeenCalled();
  });
});
