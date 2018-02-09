import Ember from 'ember';
import { find } from 'lodash';
import { paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';

const { Helper } = Ember;

export function currencySymbol(params) {
  return find(paymentCurrencies, ['code', params[0]]).symbol;
}

export default Helper.helper(currencySymbol);
