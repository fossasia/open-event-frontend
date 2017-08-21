import Ember from 'ember';

const { Component } = Ember;
export default Component.extend({
  actions: {
    moveToDetails(id) {
      this.sendAction('moveToDetails', id);
    },
    editEvent(id) {
      this.sendAction('editEvent', id);
    },
    openDeleteEventModal(id, name) {
      this.sendAction('openDeleteEventModal', id, name);
    }
  }
});
