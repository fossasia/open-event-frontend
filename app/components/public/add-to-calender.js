import Component from '@glimmer/component';
import moment from 'moment';

export default class AddToCalender extends Component {
  get calender() {
    const params = this.args.event;
    const startparams = params.startsAt;
    const timezone=params.timezone;
    const endparams = params.endsAt;
    const starttime = moment(startparams).tz(timezone).utc().format('YYYYMMDD[T]HHmmSS[Z]');
    const endtime = moment(endparams).tz(timezone).utc().format('YYYYMMDD[T]HHmmSS[Z]');
    return `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${starttime}/${endtime}&text=${params.name}&location=${this.args.eventlocation}&sf=true`;
  }

}
