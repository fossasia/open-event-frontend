import Helper from '@ember/component/helper';

export function sessionColor(params) {
  switch (params[0]) {
    case 'accepted':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'confirmed':
      return 'yellow';
    default:
      return 'red';
  }
}

export default Helper.helper(sessionColor);
