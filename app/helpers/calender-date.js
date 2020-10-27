import Helper from '@ember/component/helper';
import moment from 'moment';

export function calenderDate(params) {
  const timezone = params[1] ? params[1] : moment.tz.guess();
  return `${moment(params[0]).tz(timezone).format('dddd, MMMM DD, YYYY h:mm A')}`;
}

export default Helper.helper(calenderDate);
