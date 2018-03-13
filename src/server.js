const nodePath = require('path');
const chalk = require('chalk');
const detectPort = require('detect-port-alt');
const emoji = require('node-emoji');
const express = require('express');

const EMOJI = {
  rocket: emoji.get('rocket') + ' ',
}

const app = express();
const src = nodePath.resolve(process.argv[2] || '.');
const port = parseInt(process.argv[3] || 3000);

console.log('Serving from:', chalk.magenta(src));

app.use(express.static(src));

detectPort(port, (err, newPort) => {
  app.listen(newPort, () => console.log(EMOJI.rocket, 'Listening on port', chalk.cyan(newPort)))
});
