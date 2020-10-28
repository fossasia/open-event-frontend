import Component from '@glimmer/component';
import moment from 'moment';

export default class AddToCalender extends Component {

  get timezone() {
    return moment.tz(this.args.event.timezone).format('Z');
  }

  get calendarUrl() {
    const { event } = this.args;
    const startTime = moment(event.startsAt).tz(event.timezone).utc().format('YYYYMMDD[T]HHmmSS[Z]');
    const endTime = moment(event.endsAt).tz(event.timezone).utc().format('YYYYMMDD[T]HHmmSS[Z]');
    return `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${startTime}/${endTime}&text=${event.name}&location=${this.args.location}&sf=true`;
  }

}
