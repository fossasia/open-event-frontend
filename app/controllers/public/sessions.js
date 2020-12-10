import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';
import { groupBy } from 'lodash-es';

@classic
export default class SessionsController extends Controller {

  queryParams = ['sort', 'search'];
  search = null;
  sort = 'starts-at';
  isTrackVisible = false;
  timezone = null;
  preserveScrollPosition = true;

  @computed('model.session')
  get groupByDateSessions() {
    let sessions = groupBy(this.model.session.toArray(), s => s.startsAt);

    if (this.sort === 'title') {
      sessions = groupBy(this.model.session.toArray(), '');
    }

    const arr = [];

    for (const key in sessions) {
      let date = moment(key).format('dddd, Do MMMM');

      if (date === 'Invalid date') {
        date = null;
      }

      arr.push({
        date,
        'sessions': sessions[key]
      });
    }

    return arr;
  }

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
