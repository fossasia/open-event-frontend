import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['category', 'sub_category', 'event_type', 'date_range'],

  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    }
  }
});
