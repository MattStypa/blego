jest.mock('open');

const openMock = require('open');
const request = require('request-promise');
const tempDir = require('jest/tempDir.js');
const mockExit = require('jest/mockExit.js');

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

  it('Serves from default directory', () => {
    return serve(undefined, {port: undefined}).then((server) => {
      return request('http://localhost:3000/test.txt').then((body) => {
        server.close();
        expect(body).toEqual('1');
      });
    });
  });

  it('Serves from given directory', () => {
    return serve('web', {port: undefined}).then((server) => {
      return request('http://localhost:3000/test.txt').then((body) => {
        server.close();
        expect(body).toEqual('2');
      });
    });
  });

  it('Serves on a given port', () => {
    return serve('web', {port: 1234}).then((server) => {
      return request('http://localhost:1234/test.txt').then((body) => {
        server.close();
        expect(body).toEqual('2');
      });
    });
  });

  it('Opens the browser', () => {
    return serve('web', {port: undefined}).then((server) => {
      server.close();
      expect(openMock).toHaveBeenCalledWith(`http://localhost:3000`);
    });
  });

  it('Opens the browser on port 80', () => {
    return serve('web', {port: 80}).then((server) => {
      server.close();
      expect(openMock).toHaveBeenCalledWith(`http://localhost`);
    });
  });

  it('Dies if the given path does not exist', () => {
    mockExit(() => {
      serve('test', {port: undefined});
    });

    expect(cliErrorSpy).toHaveBeenCalled();
  });

  it('Dies if it cannot serve', () => {
    let server;
    let resolve;
    const original = cliUtils.error;
    const promise = new Promise((newResolve) => resolve = newResolve);

    cliUtils.error = jest.fn(() => {
      server.close();
      resolve();
    })

    serve('web', {port: 1234}).then((newServer) => {
        server = newServer;
        serve('web', {port: 1234});
    });

    return promise.then(() => {
      expect(cliUtils.error).toHaveBeenCalled();
      cliUtils.error = original;
    });
  });
});
