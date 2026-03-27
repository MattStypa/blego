import merge from 'lodash.merge';
import errors from './errors';
import validateType from './tools/validateType';

/**
 * Record
 * @param {string} key Identifier of the Record
 * @param {object} props Properites of the Record
 */
class Record {
  constructor(key, props = {}) {
    validateType('key', 'string', key);
    validateType('props', 'object', props);

    key = key.trim();
    !key && errors.keyRequired();
    merge(this, props);
    this.key = key;
  }
}

export default Record;
