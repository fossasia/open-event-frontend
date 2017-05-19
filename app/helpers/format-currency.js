import Ember from 'ember';

const { Helper } = Ember;

export function formatCurrency(params) {
  let value = 0,
      sign = '';
  sign = params[1];
  value = params[0];
  sign = sign ? sign : '$';
  let valueString = value.toString();
  let dollars = Math.floor(value),
      cents = (value - dollars).toFixed(2);

  if (valueString.indexOf('.') === -1) {
    dollars = value;
    cents = '00';
  } else {
    cents = (cents * 100) % 10 !== 0 ? `${cents.toString().split('.')[1]}` : `${cents.toString().split('.')[1]}`;
  }
  return `${sign} ${dollars}.${cents}`;
}

export default Helper.helper(formatCurrency);
