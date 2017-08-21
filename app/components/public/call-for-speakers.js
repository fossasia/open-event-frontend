import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    openProposalModal() {
      this.set('isCfsModalOpen', true);
    }
  }
});
