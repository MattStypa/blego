jest.mock('open');

const openMock = require('open');
const fetch = require('node-fetch');
const tempDir = require('jest_utils/tempDir.js');
const mockExit = require('jest_utils/mockExit.js');

describe('cli.serve', () => {
  const serve = require('lib/cli/serve.js');
  const cliUtils = require('lib/cli/utils.js');

  const cliErrorSpy = jest.spyOn(cliUtils, 'error');

  beforeEach(() => {
    tempDir({
      'dist/test.txt': '1',
      'web/test.txt': '2',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Serves from default directory', async () => {
    const server = await serve(undefined, {port: undefined});
    const response = await fetch('http://localhost:3000/test.txt');
    const responseText = await response.text();
    server.close();

    expect(responseText).toEqual('1');
  });

  it('Serves from given directory', async () => {
    const server = await serve('web', {port: undefined});
    const response = await fetch('http://localhost:3000/test.txt');
    const responseText = await response.text();
    server.close();

    expect(responseText).toEqual('2');
  });

  it('Serves on a given port', async () => {
    const server = await serve('web', {port: 1234});
    const response = await fetch('http://localhost:1234/test.txt');
    const responseText = await response.text();
    server.close();

    expect(responseText).toEqual('2');
  });

  it('Opens the browser', () => {
    return serve('web', {port: undefined}).then((server) => {
      server.close();
      expect(openMock).toHaveBeenCalledWith(`http://localhost:3000`);
    });
  });

  it('Opens the browser on port 80', async () => {
    const server = await serve('web', {port: 80});
    server.close();

    expect(openMock).toHaveBeenCalledWith(`http://localhost`);
  });

  it('Dies if the given path does not exist', () => {
    mockExit(() => {
      serve('test', {port: undefined});
    });

    expect(cliErrorSpy).toHaveBeenCalled();
  });

  it('Dies if it cannot serve', async () => {
    let server;
    let resolve;
    const original = cliUtils.error;
    const promise = new Promise((newResolve) => resolve = newResolve);

    cliUtils.error = jest.fn(() => {
      server.close();
      resolve();
    })

    server = await serve('web', {port: 1234});
    await serve('web', {port: 1234});
    await promise;

    const error = cliUtils.error;
    cliUtils.error = original;

    expect(error).toHaveBeenCalled();
  });
});
