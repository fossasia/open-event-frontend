import Helper from '@ember/component/helper';
import moment from 'moment';

const dateFormats = {
  'date-time-long'     : 'dddd, D MMMM, YYYY h:mm A',
  'date-time-tz-long'  : 'dddd, D MMMM, YYYY h:mm A (z)',
  'date-time-short'    : 'D MMM, YYYY h:mm A',
  'date-time-tz-short' : 'D MMM, YYYY h:mm A (z)',
  'date-short'         : 'D MMM, YYYY'
};

export function generalDate(params) {
  const timezone = params[1] || moment.tz.guess();
  const format = params[2] || 'h:mm A, MMMM Do YYYY (z)';
  return moment(params[0]).tz(timezone).format(format);
}

export default Helper.helper(generalDate);
