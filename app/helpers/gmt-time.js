import Helper from '@ember/component/helper';
import moment from 'moment';

export function gmtTimeJs(params) {
  const timezone = params[1] ? params[1] : moment.tz.guess();
  return `${moment(params[0]).tz(timezone).utc().format('YYYYMMDD[T]HHmmSS[Z]')}`;
}

export default Helper.helper(gmtTimeJs);
