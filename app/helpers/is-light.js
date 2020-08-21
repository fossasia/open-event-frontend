import { helper } from '@ember/component/helper';

export function isLight(params) {
  switch (params[0]) {
    case 'white':
      return 'black';
    default:
      return 'white';
  }
}

export default helper(isLight);
