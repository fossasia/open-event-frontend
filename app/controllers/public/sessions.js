import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';

@classic
export default class SessionsController extends Controller {

  queryParams = ['sort', 'search'];
  search = null;
  sort = 'starts-at';
  isTrackVisible = false;
  timezone = null;
  preserveScrollPosition = true;

  @computed('model.event.startsAt', 'model.event.endsAt', 'timezone')
  get allDates() {
    const arr = [];
    this.model.event.sessions.toArray().forEach(Dates => {
      arr.push(moment.tz(Dates.startsAt, this.timezone).toISOString());
    });
    return arr;
  }
}
