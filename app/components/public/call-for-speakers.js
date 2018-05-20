import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  actions: {
    openModal() {
      if (this.get('session.isAuthenticated')) {
        this.set('isCfsModalOpen', true);
      } else {
        this.set('isLoginModalOpen', true);
      }
    }
  },
  isNewSpeaker: computed('data.userSpeaker', function() {
    return !(this.get('data.userSpeaker') && this.get('data.userSpeaker').toArray().length);
  }),
  isNewSession: computed('data.userSession', function() {
    return !(this.get('data.userSession') && this.get('data.userSession').toArray().length);
  })
});
