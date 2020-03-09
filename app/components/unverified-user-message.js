import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  isMessageVisible : true,
  isMailSent       : false,

  shouldShowMessage: computed('session.isAuthenticated', 'authManager.currentUser.isVerified', 'isMessageVisible', function() {
    return this.get('session.isAuthenticated')
          && this.isMessageVisible
          && !this.get('authManager.currentUser.isVerified');
  }),

  actions: {
    sendConfirmationMail() {
      let payload = {
        'data': {
          'email': this.get('authManager.currentUser.email')
        }
      };
      this.loader
        .post('/auth/resend-verification-email', payload)
        .then(() => {
          this.notify.success(this.l10n.t('Verification mail sent successfully'), {
            id: 'ver_mail_succ'
          });
          this.set('isMailSent', true);
        })
        .catch(error => {
          console.error('Error while sending verification email', error, error.error);
          if (error.error) {
            this.notify.error(this.l10n.t(error.error), {
              id: 'ver_mail_serv_error'
            });
          } else {
            this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
              id: 'ver_mail_serv'
            });
          }
        });
    }
  }

});
