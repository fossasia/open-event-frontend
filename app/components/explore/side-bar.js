import Ember from 'ember';
import { getDateRanges } from 'open-event-frontend/utils/dictionary/filters';

const { Component, computed } = Ember;

export default Component.extend({

  classNames: ['ui', 'fluid', 'explore', 'vertical', 'menu'],

  dateRanges: computed(function() {
    return getDateRanges.bind(this)();
  }),

  filters: {
    category    : null,
    subCategory : null,
    eventType   : null,
    dateRange   : null
  },

  actions: {
    selectCategory(category, subCategory) {
      this.set('filters.category', (category === this.get('filters.category') && !subCategory) ? null : category);
      this.set('filters.subCategory', (!subCategory || subCategory === this.get('filters.subCategory')) ? null : subCategory);
    },
    selectEventType(eventType) {
      this.set('filters.eventType', eventType === this.get('filters.eventType') ? null : eventType);
    },
    selectDateRange(dateRange) {
      let isCustomDate = null;
      if (dateRange === 'custom_dates') {
        isCustomDate = dateRange;
      }
      this.set('filters.dateRange', dateRange === this.get('filters.dateRange') ?  isCustomDate : dateRange);
    }
  }
});
