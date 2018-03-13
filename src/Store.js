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
  this.records = records;

  this.all = require('./Store/all.js');
  this.cast = require('./Store/cast.js');
  this.chunk = require('./Store/chunk.js');
  this.count = require('./Store/count.js');
  this.each = require('./Store/each.js');
  this.get = require('./Store/get.js');
  this.map = require('./Store/map.js');
  this.sortBy = require('./Store/sortBy.js');
  this.sortByDesc = require('./Store/sortByDesc.js');
  this.where = require('./Store/where.js');
  this.dump = require('./Store/dump.js');
  this.dd = require('./Store/dd.js');

  this.linkToOne = require('./Store/linkToOne.js');
  this.linkToMany = require('./Store/linkToMany.js');
  this.linkFromOne = require('./Store/linkFromOne.js');
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
