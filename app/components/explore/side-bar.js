import Ember from 'ember';
import { eventTypes, eventTopics } from 'open-event-frontend/utils/dictionary/event';
import { getDateRanges } from 'open-event-frontend/utils/dictionary/filters';
import { orderBy } from 'lodash';


const { Component, computed } = Ember;

export default Component.extend({
  types: computed(function() {
    return orderBy(eventTypes);
  }),

  categories: computed(function() {
    return (eventTopics);
  }),

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
      this.set('filters.dateRange', dateRange === this.get('filters.dateRange') ? null : dateRange);
    }
  }
});
