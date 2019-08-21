import ModalBase from 'open-event-frontend/components/modals/modal-base';
import FormMixin from 'open-event-frontend/mixins/form';

export default class extends ModalBase.extend(FormMixin) {
  isSmall = true;

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        otp: {
          identifier : 'otp',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the OTP')
            }
          ]
        }
      }
    };
  }
}
