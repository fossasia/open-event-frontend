import Helper from '@ember/component/helper';
import moment from 'moment';

export function headerDate(params) {
  let [ timezone ] = params;
  let timezone = params[1];
  return `${moment(params[0]).format('dddd, MMMM Do YYYY, h:mm A')} (${moment.tz(params[0], timezone).zoneAbbr()})`;
}

export default Helper.helper(headerDate);
