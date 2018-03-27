const nodePath = require('path');
const detectPort = require('detect-port-alt');
const express = require('express');
const cliUtils = require('./utils.js');
const isDir = require('../tools/isDir.js');

/**
 * Starts a web server.
 *
 * @private
 * @param {string} path Path to the served directory.
 * @returns {Promise}
 */
function serve(path = 'dist', command) {
  !isDir(path) && cliUtils.error('Unable to find', cliUtils.quote(path));
  path = nodePath.resolve(path);

  const deferred = Promise.defer();

  console.log('Serving from', cliUtils.quote(path));

  if (command.port !== undefined) {
    deferred.resolve(startServer(path, parseInt(command.port)));
  } else {
    detectPort(3000, (err, port) => {
      deferred.resolve(startServer(path, port));
    });
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

  return server;
}

module.exports = serve;
