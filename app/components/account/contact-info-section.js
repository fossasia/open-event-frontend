import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { validPhoneNumber } from 'open-event-frontend/utils/validators';

export default Component.extend(FormMixin, {

  email     : '',
  phone     : '',
  isLoading : false,

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        email: {
          identifier : 'email',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your email ID')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        },
        phone: {
          identifier : 'phone',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a phone number.')
            },
            {
              type   : 'regExp',
              value  : validPhoneNumber,
              prompt : this.l10n.t('Please enter a valid phone number.')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
        this.sendAction('submit');
      });
    }
  }
});
