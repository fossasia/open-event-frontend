import Helper from '@ember/component/helper';

export function roundUp(params) {
  return params[0].toFixed(2);
}

export default Helper.helper(roundUp);
