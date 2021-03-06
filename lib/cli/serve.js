const nodePath = require('path');
const detectPort = require('detect-port-alt');
const express = require('express');
const open = require('open');
const cliUtils = require('./utils.js');
const isDir = require('../tools/isDir.js');

/**
 * Starts a web server
 * @param {string} [path='dist'] Path to the served directory
 * @param {command} command Command object from Commander
 * @returns {Promise}
 */
function serve(path, command) {
  const shortPath = path || 'dist';
  const fullPath = nodePath.resolve(shortPath);

  !isDir(fullPath) && cliUtils.error('Unable to find', cliUtils.quote(shortPath));

  console.log('Serving from', cliUtils.quote(fullPath));

  return new Promise((resolve) => {
    if (command.port === undefined) {
      detectPort(3000, (err, port) => resolve(startServer(fullPath, port)));
    } else {
      resolve(startServer(fullPath, parseInt(command.port)));
    }
  });
}

/**
 * Starts a web server on a given port
 * @param {string} path Path to the served directory
 * @param {int} port Port to listen on
 * @returns {server}
 */
function startServer(path, port) {
  const app = express();
  app.use(express.static(path));
  const server = app.listen(port, () => console.log(cliUtils.emoji.rocket, 'Listening on port', cliUtils.magenta(port)));
  server.on('error', (e) => cliUtils.error('Unable to listen on port', cliUtils.magenta(port), `[${e.code}]`));
  open(port == 80 ? 'http://localhost' : `http://localhost:${port}`);

  return server;
}

module.exports = serve;
