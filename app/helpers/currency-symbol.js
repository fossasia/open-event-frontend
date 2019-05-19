import Helper from '@ember/component/helper';
import { find } from 'lodash-es';
import { paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';

export function currencySymbol(params) {
  return find(paymentCurrencies, ['code', params[0]]).symbol;
}

export default Helper.helper(currencySymbol);
