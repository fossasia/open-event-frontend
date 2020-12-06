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
    const difference = (this.model.event.endsAt).diff(this.model.event.startsAt, 'days');
    for (let i = 0; i <= Math.abs(difference); i++) {
      arr.push(moment.tz(this.model.event.startsAt, this.timezone).add(i, 'days').toISOString());
    }
    return arr;
  }
}
