import Helper from '@ember/component/helper';
import moment from 'moment';

const locales12Hours = new Set(['en', 'bn', 'hi', 'id', 'ja', 'run', 'th', 'vi', 'ko']);

export function generalDate(params) {
  const timezone = params[1] || moment.tz.guess();

  const local = moment(params[0]).tz(timezone).locale();

  let format = params[2] || 'dddd, D MMMM, YYYY h:mm A (z)';

  if (!locales12Hours.has(local)) {
    format = format.replaceAll('h', 'H');
    format = format.replace(' A', '');
    format = format.replace(' a', '');
  }
  return moment(params[0]).tz(timezone).format(format);
}

export default Helper.helper(generalDate);
