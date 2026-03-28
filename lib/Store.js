import collect from 'collect.js';
import Record from './Record.js';
import errors from './errors.js';
import all from './Store/all.js';
import chunk from './Store/chunk.js';
import count from './Store/count.js';
import dd from './Store/dd.js';
import dump from './Store/dump.js';
import each from './Store/each.js';
import filter from './Store/filter.js';
import get from './Store/get.js';
import isEmpty from './Store/isEmpty.js';
import iterator from './Store/iterator.js';
import keyed from './Store/keyed.js';
import linkFromMany from './Store/linkFromMany.js';
import linkFromOne from './Store/linkFromOne.js';
import linkToMany from './Store/linkToMany.js';
import linkToOne from './Store/linkToOne.js';
import map from './Store/map.js';
import pluck from './Store/pluck.js';
import reverse from './Store/reverse.js';
import sort from './Store/sort.js';
import sortBy from './Store/sortBy.js';
import take from './Store/take.js';
import where from './Store/where.js';
import validateTypeInArray from './tools/validateTypeInArray.js';

/**
 * Store
 * All records must have a unique key
 * @param {array} records Records to be added to the store
 */
class Store {
  constructor(records) {
    validateRecords(records);
    this.collection = collect(records);

    this[Symbol.iterator] = iterator;

    this.dd = dd;
    this.dump = dump;

    this.all = all;
    this.chunk = chunk;
    this.count = count;
    this.each = each;
    this.filter = filter;
    this.get = get;
    this.isEmpty = isEmpty;
    this.keyed = keyed;
    this.map = map;
    this.pluck = pluck;
    this.reverse = reverse;
    this.sort = sort;
    this.sortBy = sortBy;
    this.take = take;
    this.where = where;

    this.linkToOne = linkToOne;
    this.linkToMany = linkToMany;
    this.linkFromOne = linkFromOne;
    this.linkFromMany = linkFromMany;
  }
}

/**
 * Checks for duplicate keys and correct types
 * @param {array} records
 */
function validateRecords(records) {
  let keys = {};

  validateTypeInArray('records', Record, records);

  records.forEach((record) => keys[record.key] ? errors.recordKeyDupe() : keys[record.key] = true);
}

export default Store;
