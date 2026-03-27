import collect from 'collect.js';
import validateType from '../tools/validateType';

/**
 * Gets all of the values for a given property
 * @param {string} prop Record property to extract
 * @return {array}
 */
function pluck(prop) {
  validateType('prop', 'string', prop);

  let props = collect([]);

  this.collection.each((record) => record[prop] && (
    Array.isArray(record[prop])
      ? (props = props.concat(record[prop]))
      : props.push(record[prop])
  ));

  return props.all();
}

export default pluck;
