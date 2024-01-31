import { tn } from '../text';

export const paymentCountries = ['US', 'AL', 'AR', 'AU', 'AT', 'BE', 'BR', 'CA', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HK', 'HU', 'IE', 'IL', 'IN', 'IT', 'JP', 'LV', 'LT', 'LU', 'MY', 'MT', 'MX', 'NL', 'NZ', 'NO', 'PH', 'PL', 'PT', 'SG', 'SK', 'SI', 'ES', 'SE', 'CH', 'TW', 'GB'];

export interface PaymentCurrency {
  code: string,
  symbol: string,
  name: string,
  paypal: boolean,
  stripe: boolean,
  alipay: boolean,
  omise: boolean,
  paytm: boolean
}

export const paymentCurrencies: PaymentCurrency[] = [
  {
    paypal : true,
    code   : 'PLN',
    symbol : 'zł',
    name   : tn.t('Polish zloty'),
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'NZD',
    symbol : 'NZ$',
    name   : tn.t('New Zealand dollar'),
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'INR',
    symbol : '₹',
    name   : tn.t('Indian rupee'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : true
  },
  {
    paypal : true,
    code   : 'BRL',
    symbol : 'R$',
    name   : tn.t('Brazilian real'),
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'SGD',
    symbol : 'SG$',
    name   : tn.t('Singapore dollar'),
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'CAD',
    symbol : 'C$',
    name   : tn.t('Canadian dollar'),
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'HKD',
    symbol : 'HK$',
    name   : tn.t('Hong Kong dollar'),
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'CZK',
    symbol : 'Kč',
    name   : tn.t('Czech koruna'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'DKK',
    symbol : 'Kr',
    name   : tn.t('Danish krone'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'NOK',
    symbol : 'kr',
    name   : tn.t('Norwegian krone'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'SEK',
    symbol : 'kr',
    name   : tn.t('Swedish krona'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'TWD',
    symbol : 'NT$',
    name   : tn.t('New Taiwan dollar'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'USD',
    symbol : '$',
    name   : tn.t('United States dollar'),
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'HUF',
    symbol : 'Ft',
    name   : tn.t('Hungarian forint'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'JPY',
    symbol : '‎¥‎',
    name   : tn.t('Japanese yen'),
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'ILS',
    symbol : '₪',
    name   : tn.t('Israeli new sheqel'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'EUR',
    symbol : '€',
    name   : tn.t('European Euro'),
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'MXN',
    symbol : '$',
    name   : tn.t('Mexican peso'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'PHP',
    symbol : '₱',
    name   : tn.t('Philippine peso'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'AUD',
    symbol : 'A$',
    name   : tn.t('Australian dollar'),
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'GBP',
    symbol : '£',
    name   : tn.t('British pound'),
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'THB',
    symbol : '฿',
    name   : tn.t('Thai baht'),
    stripe : true,
    alipay : false,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'RUB',
    symbol : 'R',
    name   : tn.t('Russian ruble'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'MYR',
    symbol : 'RM',
    name   : tn.t('Malaysian ringgit'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'CHF',
    symbol : 'Sf.',
    name   : tn.t('Swiss franc'),
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  }
];
