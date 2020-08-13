import Helper from '@ember/component/helper';
import moment from 'moment';

export function generalDate(params) {
  const timezone = params[1] ? params[1] : moment.tz.guess();
  return `${moment(params[0]).tz(timezone).format('h:mm A , MMMM Do YYYY')} (${moment.tz(params[0], timezone).zoneAbbr()})`;
}

export default Helper.helper(generalDate);
