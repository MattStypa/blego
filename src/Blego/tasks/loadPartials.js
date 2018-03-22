const handlebars = require('handlebars');
const parseDataDir = require('../../tools/parseDataDir.js');

/**
 * Registers partials with Handlebars.
 *
 * @private
 * @instance
 * @memberof Blego
 */
function loadPartials() {
  this.task('Load partials', () => {
    parseDataDir(this.paths.partials).each((file) => handlebars.registerPartial(file.key, file.body));
  });
}

module.exports = loadPartials;
