import Helper from '@ember/component/helper';

/**
 * Helper to make a string lower case and convert spaces into hyphens for URLs
 * @param params
 * @returns {*}
 */
export function spacesToHyphens(params) {
  return params[0].toLowerCase().split(' ').join('-');
}

export default Helper.helper(spacesToHyphens);