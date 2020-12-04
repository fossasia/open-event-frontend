import Helper from '@ember/component/helper';
import moment from 'moment';

const dateFormats = {
  'date-time-long'     : 'dddd, D MMMM, YYYY h:mm A',
  'date-time-tz-long'  : 'dddd, D MMMM, YYYY h:mm A (z)',
  'date-time-short'    : 'D MMM, YYYY h:mm A',
  'date-time-tz-short' : 'D MMM, YYYY h:mm A (z)',
  'date-short'         : 'D MMM, YYYY',
  'time-tz-short'      : 'h:mm A (z)'
};

const locales12Hours = new Set(['en', 'bn', 'hi', 'id', 'ja', 'run', 'th', 'vi', 'ko']);

export function generalDate(params, { tz }) {
  const timezone = tz || moment.tz.guess();

  const local = moment(params[0]).tz(timezone).locale();

  let format = (dateFormats[params[1]] || params[1]) || 'h:mm A, MMMM Do YYYY (z)';

  if (!locales12Hours.has(local)) {
    format = format.replace(/h/g, 'H');
    format = format.replace(' A', '');
    format = format.replace(' a', '');
  }
  return moment(params[0]).tz(timezone).format(format);
}

export default Helper.helper(generalDate);
