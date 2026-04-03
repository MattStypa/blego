import { internals } from '../Store.js';

/**
 * Writes the records to the console and exits the process
 */
function dd() {
  internals.get(this).collection.dd();
  process.exit(1);
}

export default dd;
