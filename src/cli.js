const program = require('commander');
const package = require('../package.json');
const build = require('./cli/build.js');
const newProject = require('./cli/new.js');
const serve = require('./cli/serve.js');

program
  .version(package.version, '-v, --version')
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
