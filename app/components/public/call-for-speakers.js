import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  actions: {
    openProposalModal() {
      this.set('isCfsModalOpen', true);
    },
    openLoginModal() {
      this.set('isLoginModalOpen', true);
    }
  },
  isNewSpeaker: computed('data.userSpeaker', function() {
    return !(this.get('data.userSpeaker') && this.get('data.userSpeaker').toArray().length);
  }),
  isNewSession: computed('data.userSession', function() {
    return !(this.get('data.userSession') && this.get('data.userSession').toArray().length);
  })
});
