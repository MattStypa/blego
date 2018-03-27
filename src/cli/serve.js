const nodePath = require('path');
const detectPort = require('detect-port-alt');
const express = require('express');
const cliUtils = require('./utils.js');
const isDir = require('../tools/isDir.js');

function serve(path = 'dist', command) {
  !isDir(path) && cliUtils.error('Unable to find', cliUtils.quote(path));

  const app = express();
  path = nodePath.resolve(path);
  app.use(express.static(path));

  console.log('Serving from', cliUtils.quote(path));

  if (command.port === undefined) {
    detectPort(3000, (err, newPort) => {
      app.listen(newPort, () => console.log(cliUtils.emoji.rocket, 'Listening on port', cliUtils.magenta(newPort)))
    });
  } else {
    const port = parseInt(command.port);
    app
      .listen(port, () => console.log(cliUtils.emoji.rocket, 'Listening on port', cliUtils.magenta(port)))
      .on('error', (e) => cliUtils.error('Unable to listen on port', cliUtils.magenta(port), `[${e.code}]`));
  }
}

module.exports = serve;
