import moment from 'moment';
import 'moment-timezone';

export const timezones = moment.tz.names();

export const FORM_DATE_FORMAT = 'MM-DD-YYYY';
export const FORM_TIME_FORMAT = 'HH:mm';

export const FORM_DATE_TIME_FORMAT = `${FORM_DATE_FORMAT} ${FORM_TIME_FORMAT}`;
