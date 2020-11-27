import Helper from '@ember/component/helper';
import moment from 'moment';

const locales12Hours = new Set(['en', 'bn', 'hi', 'id', 'ja', 'run', 'th', 'vi', 'ko']);

export function generalDate(params) {
  const timezone = params[1] || moment.tz.guess();
  const reg = new RegExp('[+-]?[0-9]+');
  const local = moment(params[0]).tz(timezone).locale();

  let format = params[2] || 'h:mm A, MMMM Do YYYY (z)';

  if (!locales12Hours.has(local)) {
    format = format.replaceAll('h', 'H');
    format = format.replace(' A', '');
    format = format.replace(' a', '');
  }

  let dateTime = moment(params[0]).tz(timezone).format(format);
  const z = moment(params[0]).tz(timezone).format('z');

  if (reg.test(z)) {
    dateTime = dateTime.replace(z, timezone);
  }

  return dateTime;
}

export default Helper.helper(generalDate);
