import Component from '@ember/component';
import { computed } from '@ember/object';
export default Component.extend({
  currentRange: computed(function() {
    return '1-10';
  }),
  pageCount: computed(function() {

  }),
  actions: {
    moveToNextPage() {
      console.log('hello');
      this.incrementProperty('currentPage');
    },
    moveToPreviousPage() {
      console.log('pevious');
      this.decrementProperty('currentPage');
    }
  },
  totalCount: 100
});
