import Helper from '@ember/component/helper';

export function sessionColor(params) {
  switch (params[0]) {
    case 'accepted':
      return 'yellow';
    case 'pending':
      return 'yellow';
    case 'confirmed':
      return 'green';
    default:
      return 'red';
  }
}

export default Helper.helper(sessionColor);
