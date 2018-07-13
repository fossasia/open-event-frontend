import Component from '@ember/component';
import moment from 'moment';

export default Component.extend({

  classNames: ['ui', 'fluid', 'explore', 'vertical', 'menu'],

  actions: {
    selectCategory(category, subCategory) {
      this.set('category', (category === this.get('category') && !subCategory) ? null : category);
      this.set('sub_category', (!subCategory || subCategory === this.get('sub_category')) ? null : subCategory);
    },

    selectEventType(eventType) {
      this.set('event_type', eventType === this.get('event_type') ? null : eventType);
    },

    dateValidate(date) {
      if (moment(date).isAfter(this.get('endDate'))) {
        this.set('endDate', date);
      }
    }
  }
});
