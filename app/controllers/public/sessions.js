import classic from 'ember-classic-decorator';
import { computed, action } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment-timezone';
import { groupBy } from 'lodash-es';

@classic
export default class SessionsController extends Controller {

  queryParams = ['sort', 'search', 'date', 'my_schedule', 'level'];
  search = null;
  sort = 'starts-at';
  date = null;
  isTrackVisible = false;
  timezone = null;
  dates = null;
  preserveScrollPosition = true;
  my_schedule=null;
  level=null;

  @computed('sort')
  get sortTitle() {
    switch (this.sort) {
      case 'title':
        return 'By Title';
      case null:
      case 'starts-at':
        return 'By Time';
      default:
        return 'By Popularity';
    }
  }

  @computed('model.session.@each', 'timezone')
  get groupByDateSessions() {
    let sessions;
    if (this.sort !== 'starts-at') {
      sessions = groupBy([...new Set(this.model.session.toArray())], '');
    } else {
      sessions = groupBy(this.model.session.toArray(), s => moment.tz(s.startsAt, this.timezone).format('dddd, Do MMMM'));
    }

    return Object.entries(sessions).map(([date, sessions]) => ({ date: date === 'undefined' ? null : date, sessions }));
  }

  @computed('model.event.startsAt', 'model.event.endsAt', 'dates', 'timezone')
  get allDates() {
    if (this.dates) {
      const uniqueDates = new Set(this.dates
        .map(date => moment.tz(date.startsAt, this.timezone).toISOString())
        .sort()
        .map(date => moment(date).format('YYYY-MM-DD')));

      return [...uniqueDates];
    } else {
      this.loadDates();
      const arr = [];
      const difference = (this.model.event.endsAt).diff(this.model.event.startsAt, 'days');
      for (let i = 0; i <= Math.abs(difference); i++) {
        arr.push(moment.tz(this.model.event.startsAt, this.timezone).add(i, 'days').toISOString());
      }
      return arr;
    }
  }

  @action
  removeActiveClass() {
    const activeEls = document.querySelectorAll('.filters .link-item.active');
    activeEls.forEach(el => {
      el.classList.remove('active');
    });
    document.querySelectorAll('input[type="checkbox"]')
      .forEach(el => el.checked = false);
  }

  async loadDates() {
    const scheduledFilterOptions = [
      {
        and: [
          {
            name : 'starts-at',
            op   : 'ne',
            val  : null
          },
          {
            or: [
              {
                name : 'state',
                op   : 'eq',
                val  : 'accepted'
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
          }
        ]
      }
    ];

    const sessions = await this.model.event.query('sessions', {
      filter            : scheduledFilterOptions,
      cache             : true,
      public            : true,
      'fields[session]' : 'starts-at',
      'page[size]'      : 0
    });

    this.set('dates', sessions.toArray());
  }

  get side_panel() {
    return this.router.currentRoute.parent.queryParams.side_panel;
  }
}
