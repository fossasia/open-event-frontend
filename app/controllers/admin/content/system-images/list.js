import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  actions: {
    openModal(selectedSubTopic) {
      this.set('selectedSubTopic', selectedSubTopic);
      this.set('isModalOpen', true);
    }
  }
});
