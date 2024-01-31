import { helper } from '@ember/component/helper';

export function orderColor(params) {
  switch (params[0]) {
    case 'completed':
      return 'green';
    case 'placed':
      return 'blue';
    case 'initializing':
      return 'yellow';
    case 'pending':
      return 'orange';
    case 'expired':
      return 'red';
    default:
      return 'grey';
  }
}

export default helper(orderColor);
