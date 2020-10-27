import Component from '@glimmer/component';
import moment from 'moment';

export default class AddToCalender extends Component {
  params = this.args.event;

  get timezone() {
    return `GMT${moment.tz("Asia/Kolkata").format('Z')}`;  
  }

  get calender() {
    const startparams = this.params.startsAt;
    const endparams = this.params.endsAt;
    const starttime = moment(startparams).tz(this.params.timezone).utc().format('YYYYMMDD[T]HHmmSS[Z]');
    const endtime = moment(endparams).tz(this.params.timezone).utc().format('YYYYMMDD[T]HHmmSS[Z]');
    return `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${starttime}/${endtime}&text=${this.params.name}&location=${this.args.eventlocation}&sf=true`;
  }

}
