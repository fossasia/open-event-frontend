import Ember from 'ember';
import { eventTypes, eventTopics } from 'open-event-frontend/utils/dictionary/event';
import { getDateRanges } from 'open-event-frontend/utils/dictionary/filters';
import { orderBy } from 'lodash';


const { Component, computed } = Ember;

export default Component.extend({

  classNames: ['ui', 'fluid', 'explore', 'vertical', 'menu'],

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
      let filterCategory = this.get('filterCategory');
      let filterSubCategory = this.get('filterSubCategory');
      let filterAction = this.get('filter');
      this.set('filters.category', (category === this.get('filters.category') && !subCategory) ? null : category);
      filterAction(filterCategory, 'category').then(filterResults => this.set('results', filterResults));
      this.set('filters.subCategory', (!subCategory || subCategory === this.get('filters.subCategory')) ? null : subCategory);
      filterAction(filterSubCategory, 'subCategory').then(filterResults => this.set('results', filterResults));
    },
    selectEventType(eventType) {
      let filterType = this.get('filterType');
      let filterAction = this.get('filter');
      this.set('filters.eventType', eventType === this.get('filters.eventType') ? null : eventType);
      filterAction(filterType, 'eventType').then(filterResults => this.set('results', filterResults));
    },
    selectDateRange(dateRange) {
      let filterDate = this.get('filterDate');
      let filterAction = this.get('filter');
      let isCustomDate = null;
      if (dateRange === 'custom_dates') {
        isCustomDate = dateRange;
      }
      this.set('filters.dateRange', dateRange === this.get('filters.dateRange') ?  isCustomDate : dateRange);
      filterAction(filterDate, 'dateRange').then(filterResults => this.set('results', filterResults));
    }
  }
});
