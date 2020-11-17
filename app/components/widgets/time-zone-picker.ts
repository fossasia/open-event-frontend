import Component from '@glimmer/component';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';

interface Args {
  defaultLocal: boolean,
  eventTimezone: string,
  timezone: string
}

export default class TimeZonePicker extends Component<Args> {
  localTimezone = dayjs.tz.guess();

  get timezones(): string[] {
    return timezones.filter(item => ![this.localTimezone, this.args.eventTimezone].includes(item));
  }
}
