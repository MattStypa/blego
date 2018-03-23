const collect = require('collect.js');
const errors = require('./errors.js');
const Record = require('./Record.js');

/**
 * Creates a Store object. All records must have a unique key.
 *
 * @constructor
 * @param {array} records Records to be added to the store.
 */
function Store(records) {
  validateRecords(records);
  this.collection = collect(records);

  this.all         =            this.collection.all.bind(this.collection);
  this.chunk       = (size)  => this.collection.chunk(size).toArray();
  this.count       =            this.collection.count.bind(this.collection);
  this.dd          =            this.collection.dd.bind(this.collection);
  this.dump        = ()      => console.log(this.collection.all()); // Normalizes dump and dd.
  this.each        =            this.collection.each.bind(this.collection);
  this.filter      = (fn)    => new this.constructor(this.collection.filter(fn).all());
  this.get         = (key)   => this.collection.firstWhere('key', key);
  this.isEmpty     =            this.collection.isEmpty.bind(this.collection);
  this.keyed       = ()      => this.collection.keyBy('key').all();
  this.map         = (fn)    => this.collection.map(fn).all();
  this.reverse     = ()      => new this.constructor(this.collection.reverse().all());
  this.sort        = (fn)    => new this.constructor(this.collection.sort(fn).all());
  this.sortBy      = (mixed) => new this.constructor(this.collection.sortBy(mixed).all());
  this.sortByDesc  = (mixed) => new this.constructor(this.collection.sortByDesc(mixed).all());
  this.take        = (size)  => this.collection.take(size).all();

  this.where       = require('./Store/where.js');
  this.pluck       = require('./Store/pluck.js');
  this.pluckUnique = require('./Store/pluckUnique.js');

  this.linkToOne    = require('./Store/linkToOne.js');
  this.linkToMany   = require('./Store/linkToMany.js');
  this.linkFromOne  = require('./Store/linkFromOne.js');
  this.linkFromMany = require('./Store/linkFromMany.js');
}

/**
 * Checks for duplicate keys and correct type.
 *
 * @private
 * @param {array} records Records to be validated.
 */
function validateRecords(records) {
  let keys = {};

  records.forEach((record) => {
    record instanceof Record || errors.invalidRecordType();
    keys[record.key] ? errors.recordKeyDupe() : keys[record.key] = true;
  });
}

module.exports = Store;
