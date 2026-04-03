import collect from 'collect.js';
import { internals } from '../Store.js';
import validateType from '../tools/validateType.js';

/**
 * Gets all of the values for a given property
 * @param {string} prop Record property to extract
 * @returns {array}
 */
function pluck(prop) {
  validateType('prop', 'string', prop);

  let props = collect([]);

  internals.get(this).collection.each((record) => record[prop] && (
    Array.isArray(record[prop])
      ? (props = props.concat(record[prop]))
      : props.push(record[prop])
  ));

  return props.all();
}

export default pluck;
