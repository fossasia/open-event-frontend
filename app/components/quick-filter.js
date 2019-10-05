import Component from '@ember/component';
import moment from 'moment';

export default Component.extend({

  dummyName     : '',
  dummyLocation : '',
  disableClear  : true,

  setDateFilter() {
    let newStartDate = null;
    let newEndDate = null;
    if (this.filterDate) {
      this.set('disableClear', false);
    }
    switch (this.filterDate) {

      case 'all_dates':
        break;

      case 'today':
        newStartDate = moment().toISOString();
        newEndDate = moment().toISOString();
        break;

      case 'tomorrow':
        newStartDate = moment().add(1, 'day').toISOString();
        newEndDate = newStartDate;
        break;

      case 'this_week':
        newStartDate = moment().startOf('week').toISOString();
        newEndDate = moment().endOf('week').toISOString();
        break;

      case 'this_weekend':
        newStartDate = moment().isoWeekday('Friday').toISOString();
        newEndDate = moment().isoWeekday('Sunday').toISOString();
        break;

      case 'next_week':
        newStartDate = moment().isoWeekday('Monday').add(1, 'week').toISOString();
        newEndDate = moment().isoWeekday('Sunday').add(1, 'week').toISOString();
        break;

      case 'this_month':
        newStartDate = moment().startOf('month').toISOString();
        newEndDate = moment().endOf('month').toISOString();
        break;

      default:
    }

    this.set('startDate', newStartDate);
    this.set('endDate', newEndDate);
  },

  init() {
    this._super(...arguments);
    this.set('dummyLocation', this.location);
    this.set('dummyName', this.eventName);
    if (this.dummyName || this.dummyLocation) {this.set('disableClear', false)}
  },
  actions: {
    handleKeyPress() {
      this.set('disableClear', false);
      if (!this.dummiessFull()) {
        this.set('disableClear', true);
      }
      if (event.code === 'Enter') {
        this.send('search');
      }
    },
    search() {
      this.setDateFilter();
      if (this.dummiessFull()) {
        this.set('location', this.dummyLocation);
        this.set('eventName', this.dummyName);
        this.set('disableClear', false);
      }
    },

    clearFilters() {
      this.set('dummyLocation', '');
      this.set('dummyName', '');
      this.set('filterDate', null);
      this.setDateFilter();
      this.set('location', this.dummyLocation);
      this.set('eventName', this.dummyName);
      this.set('disableClear', true);
    }
  },

  dummiessFull() {
    if (this.dummyLocation.length === 0 && this.dummyName.length === 0) {
      return 0;
    }
    return true;
  }
});
