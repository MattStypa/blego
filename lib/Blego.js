import init from './Blego/init.js';
import dd from './Blego/dd.js';
import dump from './Blego/dump.js';
import log from './Blego/log.js';
import macro from './Blego/macro.js';
import page from './Blego/page.js';
import warn from './Blego/warn.js';

/**
 * Blego
 */
class Blego {
  constructor() {
    this.data = {};
    this.global = {};

    this.init = init;
    this.dd = dd;
    this.dump = dump;
    this.log = log;
    this.macro = macro;
    this.page = page;
    this.warn = warn;
  }
}

export default Blego;
