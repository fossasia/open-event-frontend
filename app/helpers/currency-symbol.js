import Helper from '@ember/component/helper';
import { find } from 'lodash-es';
import { paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';

export function currencySymbol(params) {
  const currency = find(paymentCurrencies, ['code', params[0]]);
  return currency ? currency.symbol : params[0];
}

export default Helper.helper(currencySymbol);
