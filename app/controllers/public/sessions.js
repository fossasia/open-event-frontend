import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';

@classic
export default class SessionsController extends Controller {
  queryParams = ['sort'];
  sort = 'starts-at';
  isTrackVisible = false;

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
