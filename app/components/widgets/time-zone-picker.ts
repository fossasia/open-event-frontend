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

  get defaultTimezone(): string {
    if (this.args.timezone) {
      return this.args.timezone;
    } else if (this.args.defaultLocal) {
      return this.localTimezone;
    }
    return this.args.eventTimezone;
  }

  get timezones(): string[] {
    return timezones.filter(item => ![this.localTimezone, this.args.eventTimezone].includes(item));
  }
}
