import collect from 'collect.js';
import Record from './Record';
import errors from './errors';
import all from './Store/all';
import chunk from './Store/chunk';
import count from './Store/count';
import dd from './Store/dd';
import dump from './Store/dump';
import each from './Store/each';
import filter from './Store/filter';
import get from './Store/get';
import isEmpty from './Store/isEmpty';
import iterator from './Store/iterator';
import keyed from './Store/keyed';
import linkFromMany from './Store/linkFromMany';
import linkFromOne from './Store/linkFromOne';
import linkToMany from './Store/linkToMany';
import linkToOne from './Store/linkToOne';
import map from './Store/map';
import pluck from './Store/pluck';
import reverse from './Store/reverse';
import sort from './Store/sort';
import sortBy from './Store/sortBy';
import take from './Store/take';
import where from './Store/where';
import validateTypeInArray from './tools/validateTypeInArray';

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
