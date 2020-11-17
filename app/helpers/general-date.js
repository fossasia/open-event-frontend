import Helper from '@ember/component/helper';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export function generalDate(params) {
  const timezone = params[1] || dayjs.tz.guess();
  const format = params[2] || 'h:mm A, MMMM Do YYYY (z)';
  return dayjs(params[0]).tz(timezone).format(format);
}

export default Helper.helper(generalDate);
