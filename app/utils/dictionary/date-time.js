import moment from 'moment';

const timeZones = moment.tz.names();
let offsetTmz = [];
for (let i in timeZones) {
  offsetTmz.push(`(GMT${moment.tz(timeZones[i]).format('Z')}) ${timeZones[i]}`);
}

export const timezones = offsetTmz.sort();

export const FORM_DATE_FORMAT = 'MM/DD/YYYY';
export const FORM_TIME_FORMAT = 'HH:mm';

export const FORM_DATE_TIME_FORMAT = `${FORM_DATE_FORMAT} ${FORM_TIME_FORMAT}`;
