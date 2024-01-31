import classic from 'ember-classic-decorator';
import ModalBase from 'open-event-frontend/components/modals/modal-base';
import FormMixin from 'open-event-frontend/mixins/form';
import { validPhoneNumber } from 'open-event-frontend/utils/validators';

@classic
export default class PaytmPaymentOptions extends ModalBase.extend(FormMixin) {
  isSmall = true;
  isWalletSelected = false;

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        mobileNumber: {
          identifier : 'mobile_number',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the Mobile Number')
            },
            {
              type   : 'regExp',
              value  : validPhoneNumber,
              prompt : this.l10n.t('Please enter a valid mobile number')
            }
          ]
        }
      }
    };
  }

}
