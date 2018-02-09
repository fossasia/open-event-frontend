import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  actions: {
    openProposalModal() {
      this.set('isCfsModalOpen', true);
    }
  },
  isNew: computed('data.userSpeaker', function() {
    return this.get('data.userSpeaker') && this.get('data.userSpeaker').toArray().length ? false : true;
  })
});
