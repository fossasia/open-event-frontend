import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  isMessageVisible : true,

  shouldShowMessage: computed('session.isAuthenticated', 'isMessageVisible', 'isNewSpeaker', 'isNewSession', function() {
    let speakerIDlength = this.data.userSpeaker.toArray().length;
    return this.session.isAuthenticated
          && this.isMessageVisible
          && !this.isNewSpeaker
          && this.isNewSession
          && (speakerIDlength > 0);
  })
});