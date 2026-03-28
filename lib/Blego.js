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

    this.init = init.bind(this);
    this.dd = dd.bind(this);
    this.dump = dump.bind(this);
    this.log = log.bind(this);
    this.macro = macro.bind(this);
    this.page = page.bind(this);
    this.warn = warn.bind(this);
  }
}

export default Blego;
