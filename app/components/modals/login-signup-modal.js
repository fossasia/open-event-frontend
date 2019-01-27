import ModalBase from 'open-event-frontend/components/modals/modal-base';
import FormMixin from 'open-event-frontend/mixins/form';

export default ModalBase.extend(FormMixin, {
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        identification: {
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
        password: {
          identifier : 'password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your password')
            }
          ]
        }
      }
    };
  },

  actions: {
    toggleView() {
      this.set('isOpen', false);
    }
  }
});
