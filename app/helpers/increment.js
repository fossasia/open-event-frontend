import Ember from 'ember';

const { Helper } = Ember;

export function increment(params) {
  const input = parseInt(params[0]);
  if (isNaN(input)) {
    return params[0];
  }
  if (params.length === 2) {
    return input + params[1];
  }
  return input + 1;
}

export default Helper.helper(increment);
