import init from './Blego/init';
import dd from './Blego/dd';
import dump from './Blego/dump';
import log from './Blego/log';
import macro from './Blego/macro';
import page from './Blego/page';
import warn from './Blego/warn';

/**
 * Blego
 * @class
 */
 function Blego() {
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

export default Blego;
