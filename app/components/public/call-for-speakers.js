import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  actions: {
    openModal() {
      if (this.session.isAuthenticated) {
        this.set('isCfsModalOpen', true);
      } else {
        this.set('isLoginModalOpen', true);
      }
    }
  },
  isNewSpeaker: computed('data.userSpeaker', function() {
    return !(this.data.userSpeaker && this.data.userSpeaker.toArray().length);
  }),
  isNewSession: computed('data.userSession', function() {
    return !(this.data.userSession && this.data.userSession.toArray().length);
  })
});
