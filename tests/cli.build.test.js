describe('cli.build', () => {
  const nodePath = require('path');
  const mockFs = require('mock-fs');
  const build = require('cli/build.js');
  let blegoJsMock;
  let buildJsMock;

  beforeEach(() => {
    console.log = jest.fn();
    blegoJsMock = jest.fn();
    buildJsMock = jest.fn();
    jest.doMock(nodePath.resolve('blego.js'), blegoJsMock, {virtual: true});
    jest.doMock(nodePath.resolve('build.js'), buildJsMock, {virtual: true});
    mockFs({
      'blego.js': '',
      'build.js': '',
    });
  });

  afterEach(() => {
    mockFs.restore();
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
});
