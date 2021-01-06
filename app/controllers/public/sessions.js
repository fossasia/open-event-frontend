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

  @computed('model.schedules', 'timezone')
  get allDates() {
    let arr = [];
    const sessions = groupBy(this.model.schedules.toArray());

    Object.values(sessions).forEach(el => {
        arr.push(moment.tz(el[0].startsAt, this.timezone).toISOString());   
    });

    let arrSet = new Set();

    arr.forEach(el => {
      el = el.split('T')[0];
      for (let j = 0; j < arr.length; j++) {
        if (el === arr[j].split('T')[0]) {
          el = arr[j];
          break;
        }
      }
      arrSet.add(el);
    })
    
    return Array.from(arrSet).sort();
  }

  get side_panel() {
    return this.router.currentRoute.parent.queryParams.side_panel;
  }
}
