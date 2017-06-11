import Ember from 'ember';
import { find } from 'lodash';
import { paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';

const { Helper } = Ember;

export function currencyName(params) {
  return find(paymentCurrencies, ['code', params[0]]).name;
}

export default Helper.helper(currencyName);
