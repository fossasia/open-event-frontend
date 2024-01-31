import Helper from '@ember/component/helper';

/**
 * Helper to return the semantic UI width class for a given number
 * @param params
 * @returns {*}
 */
export function uiGridNumber(params) {
  [params] = params;
  if (params < 1) {
    params = 1;
  }
  if (params > 16) {
    params = 16;
  }
  switch (params) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    case 7:
      return 'seven';
    case 8:
      return 'eight';
    case 9:
      return 'nine';
    case 10:
      return 'ten';
    case 11:
      return 'eleven';
    case 12:
      return 'twelve';
    case 13:
      return 'thirteen';
    case 14:
      return 'fourteen';
    case 15:
      return 'fifteen';
    case 16:
      return 'sixteen';
  }
  return '';
}

export default Helper.helper(uiGridNumber);
