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
    name   : 'Polish zloty',
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'NZD',
    symbol : 'NZ$',
    name   : 'New Zealand dollar',
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'INR',
    symbol : '₹',
    name   : 'Indian rupee',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : true
  },
  {
    paypal : true,
    code   : 'BRL',
    symbol : 'R$',
    name   : 'Brazilian real',
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'SGD',
    symbol : 'SG$',
    name   : 'Singapore dollar',
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'CAD',
    symbol : 'C$',
    name   : 'Canadian dollar',
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'HKD',
    symbol : 'HK$',
    name   : 'Hong Kong dollar',
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'CZK',
    symbol : 'Kč',
    name   : 'Czech koruna',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'DKK',
    symbol : 'Kr',
    name   : 'Danish krone',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'NOK',
    symbol : 'kr',
    name   : 'Norwegian krone',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'SEK',
    symbol : 'kr',
    name   : 'Swedish krona',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'TWD',
    symbol : 'NT$',
    name   : 'New Taiwan dollar',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'USD',
    symbol : '$',
    name   : 'United States dollar',
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'HUF',
    symbol : 'Ft',
    name   : 'Hungarian forint',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'JPY',
    symbol : '‎¥‎',
    name   : 'Japanese yen',
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'ILS',
    symbol : '₪',
    name   : 'Israeli new sheqel',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'EUR',
    symbol : '€',
    name   : 'European Euro',
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'MXN',
    symbol : '$',
    name   : 'Mexican peso',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'PHP',
    symbol : '₱',
    name   : 'Philippine peso',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'AUD',
    symbol : 'A$',
    name   : 'Australian dollar',
    stripe : true,
    alipay : true,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'GBP',
    symbol : '£',
    name   : 'British pound',
    stripe : true,
    alipay : true,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'THB',
    symbol : '฿',
    name   : 'Thai baht',
    stripe : true,
    alipay : false,
    omise  : true,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'RUB',
    symbol : 'R',
    name   : 'Russian ruble',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'MYR',
    symbol : 'RM',
    name   : 'Malaysian ringgit',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  },
  {
    paypal : true,
    code   : 'CHF',
    symbol : 'Sf.',
    name   : 'Swiss franc',
    stripe : true,
    alipay : false,
    omise  : false,
    paytm  : false
  }
];
