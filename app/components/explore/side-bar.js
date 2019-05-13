import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';
import { getDateRanges } from 'open-event-frontend/utils/dictionary/filters';

export default Component.extend({

  classNames: ['ui', 'fluid', 'explore', 'vertical', 'menu'],

  customStartDate: moment().toISOString(),

  customEndDate: null,

  hideClearFilters: computed('category', 'sub_category', 'event_type', 'startDate', 'endDate', 'location', function() {
    return !(this.get('category') || this.get('sub_category') || this.get('event_type') || this.get('startDate') || this.get('endDate') || this.get('location') !== null);
  }),

  dateRanges: computed(function() {
    return getDateRanges.bind(this)();
  }),

  actions: {
    selectCategory(category, subCategory) {
      this.set('category', (category === this.get('category') && !subCategory) ? null : category);
      this.set('sub_category', (!subCategory || subCategory === this.get('sub_category')) ? null : subCategory);
    },

    selectEventType(eventType) {
      this.set('event_type', eventType === this.get('event_type') ? null : eventType);
    },

    dateValidate(date) {
      if (moment(date).isAfter(this.get('customEndDate'))) {
        this.set('customEndDate', date);
      }

      this.send('selectDateFilter', 'custom_dates');
    },

    selectDateFilter(dateType) {
      let newStartDate = null;
      let newEndDate = null;

      if (dateType === this.get('dateType') && dateType !== 'custom_dates') {
        this.set('dateType', null);
      } else {
        this.set('dateType', dateType);
        switch (dateType) {
          case 'custom_dates':
            newStartDate = this.get('customStartDate');
            newEndDate = this.get('customEndDate');
            break;

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
      }

      this.set('startDate', newStartDate);
      this.set('endDate', newEndDate);
    },

    onDateChange() {
      this.send('selectDateFilter', 'custom_dates');
    },

    clearFilters() {
      this.set('startDate', null);
      this.set('endDate', null);
      this.set('dateType', null);
      this.set('category', null);
      this.set('sub_category', null);
      this.set('event_type', null);
      this.set('location', null);
    }
  }
});
