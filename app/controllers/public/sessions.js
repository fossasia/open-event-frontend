import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';

@classic
export default class SessionsController extends Controller {

  queryParams = ['sort'];
  sort = 'starts-at';
  isTrackVisible = false;
  currentTimezone = moment.tz.guess();
  localTimezone = moment.tz.guess();


  @computed
  get timezones() {
    let mytimezones = []
    mytimezones = timezones.filter(item => item !== moment.tz.guess());
    mytimezones.unshift(moment.tz.guess());
    return mytimezones;
  }

  @computed('model.event.startsAt', 'model.event.endsAt')
  get allDates() {
    const arr = [];
    const difference = (this.model.event.endsAt).diff(this.model.event.startsAt, 'days');
    for (let i = 0; i <= Math.abs(difference); i++) {
      arr.push(moment.tz(this.model.event.startsAt, this.model.event.timezone).add(i, 'days').toISOString());
    }
    return arr;
  }
}
