import Helper from '@ember/component/helper';
import { find } from 'lodash-es';
import { paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';

export function currencyName(params) {
  return find(paymentCurrencies, ['code', params[0]]).name;
}

export default Helper.helper(currencyName);
