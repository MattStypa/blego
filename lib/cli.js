#!/usr/bin/env node

import { program } from 'commander';
import newProject from './cli/new.js';
import build from './cli/build.js';
import serve from './cli/serve.js';
import packageJson from '../package.json' with { type: 'json' };

program
  .version(packageJson.version, '-v, --version')
  .usage('<command> [args]');

program
  .command('new <path>')
  .description('creates new Blego project')
  .action(newProject);

program
  .command('build [path]')
  .description('builds Blego project')
  .action(build);

program
  .command('serve [path]')
  .description('starts web server')
  .option('-p, --port <int>', 'port to serve on')
  .action(serve);

program
  .command('*', null, {noHelp: true})
  .action(() => {
    program.help();
  });

program.parse(process.argv);

if (program.args.length === 0) {
  build();
}
