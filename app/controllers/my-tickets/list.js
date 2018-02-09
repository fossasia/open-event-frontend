import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    }
  }
});
