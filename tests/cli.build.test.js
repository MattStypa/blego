describe('cli.build', () => {
  const nodePath = require('path');
  const tempDir = require('../jest/tempDir.js');
  const exitMock = require('../jest/exitMock.js');
  const throwingMock = require('../jest/throwingMock.js');
  const build = require('cli/build.js');
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

  it('Dies if the given files does not exist', () => {
    const [restoreExit, mockExit] = exitMock(() => { throw new Error() });

    expect(() => {
      build('test');
    }).toThrow();

    restoreExit();

    expect(mockExit).toHaveBeenCalled();
  });
});
