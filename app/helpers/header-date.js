import Helper from '@ember/component/helper';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export function headerDate(params) {
  const timezone = params[1] ? params[1] : dayjs.tz.guess();
  return `${dayjs(params[0]).tz(timezone).format('dddd, MMMM Do YYYY, h:mm A')} (${dayjs.tz(params[0], timezone).zoneAbbr()})`;
}

export default Helper.helper(headerDate);
