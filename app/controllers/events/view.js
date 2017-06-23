import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    openDeleteEventModal() {
      this.set('isEventDeleteModalOpen', true);
    },

    deleteEvent() {
      this.set('isEventDeleteModalOpen', false);
    }
  }
});
