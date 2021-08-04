import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

@classic
export default class TestEmailForm extends Component.extend(FormMixin) {
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        testEmail: {
          identifier : 'test_email',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the recipient E-mail')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        }
      }
    };
  }

  @action
  sendTestMail() {
    this.onValid(() => {
      const payload = {
        recipient: this.recipientEmail
      };
      const config = {
        skipDataTransform: true
      };
      this.loader.post('/test-mail', JSON.stringify(payload), config)
        .then(response => {
          this.notify.success(response.message, {
            id: 'succ_response_test'
          });
        })
        .catch(e => {
          console.error('Error while sending test email', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
            id: 'test_mail_err'
          });
        });
    });
  }
}
