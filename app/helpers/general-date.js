import Helper from '@ember/component/helper';
import moment from 'moment';

const locales12Hours = new Set(['en', 'bn', 'hi', 'id', 'ja', 'run', 'th', 'vi', 'ko']);

export function generalDate(params, { tz }) {
  const timezone = tz || moment.tz.guess();

  const local = moment(params[0]).tz(timezone).locale();

  let format = params[1] || 'h:mm A, MMMM Do YYYY (z)';

  if (!locales12Hours.has(local)) {
    format = format.replaceAll('h', 'H');
    format = format.replace(' A', '');
    format = format.replace(' a', '');
  }
  return moment(params[0]).tz(timezone).format(format);
}

export default Helper.helper(generalDate);
