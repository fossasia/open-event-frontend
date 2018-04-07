import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

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
              prompt : this.get('l10n').t('Please enter your email ID')
            },
            {
              type   : 'email',
              prompt : this.get('l10n').t('Please enter a valid email ID')
            }
          ]
        },
        phone: {
          identifier : 'phone',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your phone')
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
