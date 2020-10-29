import Component from '@glimmer/component';
import moment, { Moment } from 'moment';
import Event from 'open-event-frontend/models/event';

interface Args {
  event: Event,
  location: string
}

export default class AddToCalender extends Component<Args> {

  get timezone(): string {
    return moment.tz(this.args.event.timezone).format('z');
  }

  get startsAt(): Moment {
    const { event } = this.args;
    return moment(event.startsAt).tz(event.timezone);
  }

  get endsAt(): Moment {
    const { event } = this.args;
    return moment(event.endsAt).tz(event.timezone);
  }

  get isSingleDay(): boolean {
    return this.startsAt.isSame(this.endsAt, 'day');
  }

  get calendarUrl(): string {
    const { event } = this.args;
    const startTime = this.startsAt.utc().format('YYYYMMDD[T]HHmmSS[Z]');
    const endTime = this.endsAt.utc().format('YYYYMMDD[T]HHmmSS[Z]');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startTime}/${endTime}&text=${event.name}&location=${this.args.location}&ctz=${event.timezone}&details=${event.description}`;
  }

}
