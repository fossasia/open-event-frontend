import { helper } from '@ember/component/helper';
import { getProperties as emberGetProperties } from '@ember/object';
import flatten from 'lodash-es/flatten';

/**
 * Get all the listed properties as a hash.
 *
 * @param params
 * @return {{}|(Pick<UnwrapComputedPropertyGetters<*>, *> | Pick<UnwrapComputedPropertyGetters<*>, Array>)}
 */
export function getProperties(params = []) {
  if (params.length < 2 || !params[1]) {
    return {};
  }
  const inputParams = params.slice();
  const row = inputParams.shift();
  return emberGetProperties(row, flatten(inputParams));
}

export default helper(getProperties);
