describe('cli.new', () => {
  const childProcess = require('child_process');
  const fs = require('fs-extra');
  const tempDir = require('../jest/tempDir.js');
  const mockExit = require('../jest/mockExit.js');
  const cliNew = require('cli/new.js');
  const cliUtils = require('cli/utils.js');
  const cliErrorSpy = jest.spyOn(cliUtils, 'error');

  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    childProcess.spawnSync = jest.fn();
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
    const mock = mockExit(() => {
      cliNew('exists');
    });

    expect(cliErrorSpy).toHaveBeenCalled();
  });
});
