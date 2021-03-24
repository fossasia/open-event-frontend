import { helper } from '@ember/component/helper';

export function includesFilter(params) {
  if (params[0] && typeof params[0].includes === 'function') {
    const value = params[1] + ':';
    return params[0].includes(value);
  }
  return false;
}

export default helper(includesFilter);
