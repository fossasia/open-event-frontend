import Helper from '@ember/component/helper';
import moment from 'moment-timezone';
import { tzAbbr } from 'open-event-frontend/utils/dictionary/tzAbbr';

const dateFormats = {
  'date-time-long'     : 'dddd, D MMMM, YYYY h:mm A',
  'date-time-tz-long'  : 'dddd, D MMMM, YYYY h:mm A',
  'date-time-short'    : 'D MMM, YYYY h:mm A',
  'date-time-tz-short' : 'D MMM, YYYY h:mm A',
  'date-short'         : 'D MMM, YYYY',
  'time-short'         : 'h:mm A',
  'time-tz-short'      : 'h:mm A',
  'tz'                 : ' '
};

const locales12Hours = new Set(['en', 'bn', 'hi', 'id', 'ja', 'run', 'th', 'vi', 'ko']);

export function generalDate(params, { tz }) {
  const timezone = tz || moment.tz.guess();

  const local = moment(params[0]).tz(timezone).locale();

  let format = (dateFormats[params[1]] || params[1]) || 'h:mm A, MMMM Do YYYY';

  if (!locales12Hours.has(local)) {
    format = format.replace(/h/g, 'H');
    format = format.replace(' A', '');
    format = format.replace(' a', '');
  }

  let dateTime = moment(params[0]).tz(timezone).format(format);

  const timezoneAbbr = tzAbbr[timezone] || moment(params[0]).tz(timezone).format('z');

  if (!params[1] || params[1].includes('tz')) {
    dateTime += ` (${timezoneAbbr})`;
  }

  return dateTime;
}

export default Helper.helper(generalDate);
