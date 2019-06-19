import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
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
              prompt : this.l10n.t('Please enter the recepient E-mail')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid  email address')
            }
          ]
        }
      }
    };
  },
  actions: {
    sendTestMail() {
      this.onValid(() => {
        let payload = {
          recipient: this.recipientEmail
        };
        let config = {
          skipDataTransform: true
        };
        this.loader.post('/test-mail', JSON.stringify(payload), config)
          .then(response => {
            this.notify.success(response.message);
          })
          .catch(e => {
            console.warn(e);
            this.notify.error(this.l10n.t('An unexpected error has occurred'));
          });
      });
    }
  }
});
