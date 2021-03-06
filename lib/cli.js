#!/usr/bin/env node

const program = require('commander');
const packageJson = require('../package.json');
const newProject = require('./cli/new.js');
const build = require('./cli/build.js');
const serve = require('./cli/serve.js');

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
