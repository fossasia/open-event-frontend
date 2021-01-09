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

  @computed('model.session.@each', 'timezone')
  get groupByDateSessions() {
    let sessions;
    if (this.sort === 'title') {
      sessions = groupBy(this.model.session.toArray(), '');
    } else {
      sessions = groupBy(this.model.session.toArray(), s => moment.tz(s.startsAt, this.timezone).format('dddd, Do MMMM'));
    }
    return Object.entries(sessions).map(([date, sessions]) => ({ date: date === 'undefined' ? null : date, sessions }));
  }

  @computed('model.dates', 'timezone')
  get allDates() {

    const uniqueDates = new Set();

    this.model.dates.toArray().map(el => moment(moment.tz(el.startsAt, this.timezone)).format('YYYY-MM-DD')).sort().map(el => uniqueDates.add(el));

    return [...uniqueDates];
  }

  get side_panel() {
    return this.router.currentRoute.parent.queryParams.side_panel;
  }
}
