import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@ember/component';

export default class UnverifiedUserMessage extends Component {
  @tracked isMessageVisible = true;
  isMailSent = false;

  get shouldShowMessage() {
    return this.session.isAuthenticated
          && this.isMessageVisible
          && !this.authManager?.currentUser?.isVerified;
  }

  @action
  sendConfirmationMail() {
    const payload = {
      'data': {
        'email': this.authManager.currentUser.email
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
          this.notify.error(error.error, {
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
