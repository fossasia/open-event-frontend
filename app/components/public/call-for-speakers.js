import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  actions: {
    openProposalModal() {
      this.set('isCfsModalOpen', true);
    }
  },
  isNewSpeaker: computed('data.userSpeaker', function() {
    return this.get('data.userSpeaker') && this.get('data.userSpeaker').toArray().length ? false : true;
  }),
  isNewSession: computed('data.userSession', function() {
    return this.get('data.userSession') && this.get('data.userSession').toArray().length ? false : true;
  })
});
