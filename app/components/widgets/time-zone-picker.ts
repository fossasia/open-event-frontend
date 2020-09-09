import Component from '@glimmer/component';
import moment from 'moment';
import 'moment-timezone';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';

interface Args {
  defaultLocal: boolean,
  eventTimezone: string,
  timezone: string
}

export default class TimeZonePicker extends Component<Args> {
  localTimezone = moment.tz.guess();

  get timezones(): string[] {
    return timezones.filter(item => ![this.localTimezone, this.args.eventTimezone].includes(item));
  }
}
