import { currency } from 'accounting/settings';

export default {
  name: 'accounting.js',
  initialize() {
    currency.symbol = '';
  }
};
