import Component from '@glimmer/component';
import moment, { Moment } from 'moment';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';


interface Args {
  event: Event,
  location: string
}

export default class AddToCalender extends Component<Args> {

  @service loader: any;

  get startsAt(): Moment {
    const { event } = this.args;
    return moment(event.startsAt).tz(event.timezone);
  }

  get endsAt(): Moment {
    const { event } = this.args;
    return moment(event.endsAt).tz(event.timezone);
  }

  get googleUrl(): string {
    const { event } = this.args;
    const startTime = this.startsAt.utc().format('YYYYMMDD[T]HHmmSS[Z]');
    const endTime = this.endsAt.utc().format('YYYYMMDD[T]HHmmSS[Z]');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startTime}/${endTime}&text=${event.name}&location=${this.args.location}&ctz=${event.timezone}&details=${event.description}`;
  }

  get yahooUrl(): string {
    const { event } = this.args;
    const startTime = this.startsAt.format('YYYYMMDD[T]HHmmSS');
    const endTime = this.endsAt.format('YYYYMMDD[T]HHmmSS');
    return `https://calendar.yahoo.com/?v=60&title=${event.name}&st=${startTime}&et=${endTime}&desc=${event.description}&in_loc=${this.args.location}`;
  }

  get outlookUrl(): string {
    const { event } = this.args;
    const startTime = this.startsAt.utc().format('YYYY[-]MM[-]DDTHH[:]mm[:]SS[Z]');
    const endTime = this.endsAt.utc().format('YYYY[-]MM[-]DDTHH[:]mm[:]SS[Z]');
    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${event.name}&startdt=${startTime}&enddt=${endTime}&body=${(event.description).substring(0, 1000)}&location=${this.args.location}`;
  }

  get iCalUrl(): string {
    const host = this.loader.host();
    return host + '/v1/events/' + this.args.event.identifier + '.ics?download';
  }

  get calendarUrls(): { name: string; url: string; }[] {
    return [{ name: 'Google Calendar', url: this.googleUrl }, { name: 'iCal', url: this.iCalUrl }, { name: 'Yahoo', url: this.yahooUrl }, { name: 'Outlook', url: this.outlookUrl }];
  }

}
