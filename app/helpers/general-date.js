import Helper from '@ember/component/helper';
import moment from 'moment';

export function generalDate(params) {
  const timezone = params[1] || moment.tz.guess();
  const format = params[2] || 'D MMM, YYYY h:mm A (z)';
  return moment(params[0]).tz(timezone).format(format);
}

export default Helper.helper(generalDate);
