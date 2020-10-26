import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';
export default Component.extend({
  classNames: ['ui', 'basic', 'segment'],

  calender: computed(function() {
    const params = this.get('event');
    const startparams = params.startsAt;
    const endparams = params.endsAt;
    const starttime = moment(startparams).tz('Asia/Kolkata').utc().format('YYYYMMDD[T]HHmmSS[Z]');
    const endtime = moment(endparams).tz('Asia/Kolkata').utc().format('YYYYMMDD[T]HHmmSS[Z]');
    return `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${starttime}/${endtime}&text=${params.name}&location=${this.get('eventlocation')}&sf=true`;
  })

});
