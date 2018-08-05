import Component from '@ember/component';
import moment from 'moment';

export default Component.extend({
  classNames: ['ui', 'action', 'input', 'fluid'],

  dummyName     : null,
  dummyLocation : null,
  disableClear  : true,

  setDateFilter() {
    let newStartDate = null;
    let newEndDate = null;

    switch (this.get('filterDate')) {

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
    this.set('dummyLocation', this.get('location'));
    this.set('dummyName', this.get('eventName'));
    if (this.get('dummyName') || this.get('dummyLocation')) {this.set('disableClear', false)}
  },

  actions: {
    search() {
      this.setDateFilter();
      this.set('location', this.get('dummyLocation'));
      this.set('eventName', this.get('dummyName'));
      this.set('disableClear', false);
    },

    clearFilters() {
      this.set('dummyLocation', null);
      this.set('dummyName', null);
      this.set('filterDate', null);
      this.setDateFilter();
      this.set('location', this.get('dummyLocation'));
      this.set('eventName', this.get('dummyName'));
      this.set('disableClear', true);
    }
  }
});
