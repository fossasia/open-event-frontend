import Helper from '@ember/component/helper';

export function includes(params) {
  if (params[0] && typeof params[0].includes === 'function') {
    return params[0].includes(params[1]);
  }
  return false;
}

export default Helper.helper(includes);
