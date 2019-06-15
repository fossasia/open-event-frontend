import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';
import { getDateRanges } from 'open-event-frontend/utils/dictionary/filters';

export default Component.extend({

  classNames: ['ui', 'fluid', 'explore', 'vertical', 'menu'],

  customStartDate: moment().toISOString(),

  customEndDate : null,
  showFilters   : false,

  hideClearFilters: computed('category', 'sub_category', 'event_type', 'startDate', 'endDate', 'location', function() {
    return !(this.category || this.sub_category || this.event_type || this.startDate || this.endDate || this.location !== null);
  }),

  showAllCategories: computed('category', 'sub_category', function() {
    return !(this.category || this.sub_category);

  }),
  showAllTypes: computed('event_type', function() {
    return !this.event_type;

  }),


  dateRanges: computed(function() {
    return getDateRanges.bind(this)();
  }),

  showFiltersOnMobile: computed('device.isMobile', 'showFilters', function() {
    return (!this.device.isMobile || this.showFilters);
  }),

  actions: {
    onLocationChangeHandler(lat, lng) {
      this.setProperties({
        zoom: 17,
        lat,
        lng
      });
    },
    selectCategory(category, subCategory) {
      this.set('category', (category === this.category && !subCategory) ? null : category);
      this.set('sub_category', (!subCategory || subCategory === this.sub_category) ? null : subCategory);
    },

    selectEventType(eventType) {
      this.set('event_type', eventType === this.event_type ? null : eventType);
    },

    dateValidate(date) {
      if (moment(date).isAfter(this.customEndDate)) {
        this.set('customEndDate', date);
      }

      this.send('selectDateFilter', 'custom_dates');
    },

    selectDateFilter(dateType) {
      let newStartDate = null;
      let newEndDate = null;

      if (dateType === this.dateType && dateType !== 'custom_dates') {
        this.set('dateType', null);
      } else {
        this.set('dateType', dateType);
        switch (dateType) {
          case 'custom_dates':
            newStartDate = this.customStartDate;
            newEndDate = this.customEndDate;
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
    clearFilterCategory() {
      this.setProperties({
        category     : null,
        sub_category : null
      });

    },
    clearFilterTypes() {
      this.set('event_type', null);
    },

    clearFilters() {

      this.set('startDate', null);
      this.set('endDate', null);
      this.set('dateType', null);
      this.set('category', null);
      this.set('sub_category', null);
      this.set('event_type', null);
      this.set('location', null);
    },

    toggleFilters() {
      this.set('showFilters', !this.showFilters);

    }
  }
});
