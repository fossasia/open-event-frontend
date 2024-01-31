import Helper from '@ember/component/helper';

/**
 * Helper to URL encode a string
 * @param params
 * @returns {*}
 */
export function urlEncode(params) {
  if (!params || params.length === 0) {
    return '';
  }
  return encodeURIComponent(params[0]);
}

export default Helper.helper(urlEncode);
