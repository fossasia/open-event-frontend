import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  isMessageVisible: true,

  shouldShowMessage: computed('session.isAuthenticated', 'authManager.currentUser.isVerified', 'isMessageVisible', function() {
    return this.get('session.isAuthenticated')
          && this.get('isMessageVisible')
          && !this.get('authManager.currentUser.isVerified');
  })

});
