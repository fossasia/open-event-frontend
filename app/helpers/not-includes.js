import Helper from '@ember/component/helper';

export function notIncludes(params) {
  if (params[0] && typeof params[0].includes === 'function') {
    return !(params[0].includes(params[1]));
  }
  return true;
}

export default Helper.helper(notIncludes);
