/**
 * Blego
 * @class
 */
 function Blego() {
  this.data = {};
  this.global = {};

  this.init = require('./Blego/init.js').bind(this);
  this.dd = require('./Blego/dd.js').bind(this);
  this.dump = require('./Blego/dump.js').bind(this);
  this.log = require('./Blego/log.js').bind(this);
  this.macro = require('./Blego/macro.js').bind(this);
  this.page = require('./Blego/page.js').bind(this);
  this.partial = require('./Blego/partial.js').bind(this);
  this.warn = require('./Blego/warn.js').bind(this);
}

module.exports = Blego;
