import { helper } from '@ember/component/helper';

export function paymentIcon(params) {
  switch (params[0]) {
    case 'Visa':
      return 'big visa icon';
    case 'MasterCard':
      return 'big mastercard icon';
    case 'American Express':
      return 'big amex icon';
    default:
      return false;
  }
}

export default helper(paymentIcon);
