import Ember from 'ember';

const { Helper } = Ember;

export function urlEncode(params) {
  if (!params || params.length === 0) {
    return '';
  }
  return encodeURIComponent(params[0]);
}

export default Helper.helper(urlEncode);
