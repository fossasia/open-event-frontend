import Helper from '@ember/component/helper';
import moment from 'moment';

export function generalDate(params) {
  const timezone = params[1] || moment.tz.guess();
  let changeTo24 = false;

  let format = params[2] || 'h:mm A, MMMM Do YYYY (z)';

  if (moment(params[0]).tz(timezone).format('A') === 'AM' || moment(params[0]).tz(timezone).format('A') === 'PM') {
    changeTo24 = true;
  }

  if (changeTo24) {
    format = format.replaceAll('h', 'H');
    format = format.replace(' A', '');
    format = format.replace(' a', '');
  }
  return moment(params[0]).tz(timezone).format(format);
}

export default Helper.helper(generalDate);
