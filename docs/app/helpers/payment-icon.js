import { helper } from '@ember/component/helper';

export function paymentIcon(params) {
  switch (params[0]) {
    case 'Visa':
      return 'big cc visa icon';
    case 'MasterCard':
      return 'big cc mastercard icon';
    case 'American Express':
      return 'big cc amex icon';
    default:
      return false;
  }
}

export default helper(paymentIcon);
