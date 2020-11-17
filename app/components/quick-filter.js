import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

@classic
export default class QuickFilter extends Component {
  dummyName = null;
  dummyLocation = null;
  disableClear = true;

  setDateFilter() {
    let newStartDate = null;
    let newEndDate = null;

    switch (this.filterDate) {

      case 'all_dates':
        break;

      case 'today':
        newStartDate = dayjs().toISOString();
        newEndDate = dayjs().toISOString();
        break;

      case 'tomorrow':
        newStartDate = dayjs().add(1, 'day').toISOString();
        newEndDate = newStartDate;
        break;

      case 'this_week':
        newStartDate = dayjs().startOf('week').toISOString();
        newEndDate = dayjs().endOf('week').toISOString();
        break;

      case 'this_weekend':
        newStartDate = dayjs().isoWeekday('Friday').toISOString();
        newEndDate = dayjs().isoWeekday('Sunday').toISOString();
        break;

      case 'next_week':
        newStartDate = dayjs().isoWeekday('Monday').add(1, 'week').toISOString();
        newEndDate = dayjs().isoWeekday('Sunday').add(1, 'week').toISOString();
        break;

      case 'this_month':
        newStartDate = dayjs().startOf('month').toISOString();
        newEndDate = dayjs().endOf('month').toISOString();
        break;

      default:
    }

    this.set('startDate', newStartDate);
    this.set('endDate', newEndDate);
  }

  init() {
    super.init(...arguments);
    this.set('dummyLocation', this.location);
    this.set('dummyName', this.eventName);
    if (this.dummyName || this.dummyLocation) {this.set('disableClear', false)}
  }

  @action
  handleKeyPress() {
    if (event.code === 'Enter') {
      this.send('search');
    }
  }

  @action
  search() {
    this.setDateFilter();
    this.set('location', this.dummyLocation);
    this.set('eventName', this.dummyName);
    this.set('disableClear', !(this.dummyName || this.dummyLocation || this.startDate !== null));
  }

  @action
  clearFilters() {
    this.set('dummyLocation', null);
    this.set('dummyName', null);
    this.set('filterDate', null);
    this.setDateFilter();
    this.set('location', this.dummyLocation);
    this.set('eventName', this.dummyName);
    this.set('disableClear', true);
  }
}
