import Ember from 'ember';
import { getDateRanges } from 'open-event-frontend/utils/dictionary/filters';

const { Component, computed } = Ember;

export default Component.extend({

  classNames: ['ui', 'fluid', 'explore', 'vertical', 'menu'],

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
    selectDateRange(dateRange) {
      let isCustomDate = null;
      if (dateRange === 'custom_dates') {
        isCustomDate = dateRange;
      }
      this.set('date_range', dateRange === this.get('date_range') ?  isCustomDate : dateRange);
    }
  }
});
