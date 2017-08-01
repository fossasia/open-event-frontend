import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    },
    filterEventType(param, type) {
      if (type === 'category') {
        return this.store.query('event-topic', { name: param });
      } else if (type === 'subCategory') {
        return this.store.query('event-sub-topic', { name: param });
      } else if (type === 'eventType') {
        return this.store.query('event-type', { name: param });
      } else {
        return this.store.query('event', { name: param });
      }
    }
  }
});
