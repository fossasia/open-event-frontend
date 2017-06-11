import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Ticket Fees');
  },
  model() {
    return [
      {
        currency   : 'PLN',
        serviceFee : 10.5,
        maximumFee : 100.0
      },
      {
        currency   : 'NZD',
        serviceFee : 20.0,
        maximumFee : 500.0
      },
      {
        currency   : 'INR',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'BRL',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'SGD',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'CAD',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'HKD',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'CZK',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'DKK',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'NOK',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'SEK',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'TWD',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'USD',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'HUF',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'JPY',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'ILS',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'EUR',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'MXN',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'PHP',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'AUD',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'GBP',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'THB',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'RUB',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'MYR',
        serviceFee : 0.0,
        maximumFee : 0.0
      },
      {
        currency   : 'CHF',
        serviceFee : 0.0,
        maximumFee : 0.0
      }
    ];
  }
});
