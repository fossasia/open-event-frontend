import Helper from '@ember/component/helper';
import moment from 'moment';

export function headerDate(params) {
  const timezone = params[1] ? params[1] : moment.tz.guess();

  const locals = ['en', 'bn', 'hi', 'id', 'ja', 'run', 'th', 'vi', 'ko'];
  const local = moment(params[0]).tz(timezone).locale();

  let format = 'dddd, MMMM Do YYYY, h:mm A';

  if (!locals.includes(local)) {
    format = format.replaceAll('h', 'H');
    format = format.replace(' A', '');
  }

  return `${moment(params[0]).tz(timezone).format(format)} (${moment.tz(params[0], timezone).zoneAbbr()})`;
}

export default Helper.helper(headerDate);
