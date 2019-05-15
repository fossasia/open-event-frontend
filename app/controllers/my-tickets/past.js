import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    }
  }
});
