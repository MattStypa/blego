const nodePath = require('path');
const detectPort = require('detect-port-alt');
const express = require('express');
const opn = require('opn');
const cliUtils = require('./utils.js');
const isDir = require('../tools/isDir.js');

/**
 * Starts a web server.
 *
 * @private
 * @param {string} [path='dist'] Path to the served directory.
 * @param {command} command Command object from Commander.
 * @returns {Promise}
 */
function serve(path = 'dist', command) {
  const fullPath = nodePath.resolve(path);

  !isDir(fullPath) && cliUtils.error('Unable to find', cliUtils.quote(path));

  const deferred = Promise.defer();

  console.log('Serving from', cliUtils.quote(fullPath));

  if (command.port === undefined) {
    detectPort(3000, (err, port) => deferred.resolve(startServer(fullPath, port)));
  } else {
    deferred.resolve(startServer(fullPath, parseInt(command.port)));
  }

  return deferred.promise;
}

/**
 * Starts a web server on a given port.
 *
 * @private
 * @param {string} path Path to the served directory.
 * @param {int} port Port to listen on.
 * @returns {server}
 */
function startServer(path, port) {
  const app = express();
  app.use(express.static(path));
  const server = app.listen(port, () => console.log(cliUtils.emoji.rocket, 'Listening on port', cliUtils.magenta(port)));
  server.on('error', (e) => cliUtils.error('Unable to listen on port', cliUtils.magenta(port), `[${e.code}]`));

  if (!__TEST__) {
    port == 80 ? opn('http://localhost') : opn(`http://localhost:${port}`);
  }

  return server;
}

module.exports = serve;
