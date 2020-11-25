import Helper from '@ember/component/helper';
import moment from 'moment';

export function generalDate(params) {
  const timezone = params[1] || moment.tz.guess();

  const locals = ['en', 'bn', 'hi', 'id', 'ja', 'run', 'th', 'vi', 'ko'];
  const local = moment(params[0]).tz(timezone).locale();

  let format = params[2] || 'h:mm A, MMMM Do YYYY (z)';

  if (!locals.includes(local)) {
    format = format.replaceAll('h', 'H');
    format = format.replace(' A', '');
    format = format.replace(' a', '');
  }
  return moment(params[0]).tz(timezone).format(format);
}

export default Helper.helper(generalDate);
