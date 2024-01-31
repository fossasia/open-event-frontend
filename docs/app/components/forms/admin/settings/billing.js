import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { validPhoneNumber } from 'open-event-frontend/utils/validators';
import { action } from '@ember/object';

@classic
export default class Billing extends Component.extend(FormMixin) {
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        adminBillingPhone: {
          identifier : 'adminBillingPhone',
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : validPhoneNumber,
              prompt : this.l10n.t('Please enter a valid mobile number.')
            }
          ]
        },
        adminBillingEmail: {
          identifier : 'adminBillingEmail',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the email')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        },
        adminBillingPaypalEmail: {
          identifier : 'adminBillingPaypalEmail',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the billing paypal email invoice money will be transferred to')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        },
        adminBillingCountry: {
          identifier : 'adminBillingCountry',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select the country')
            }
          ]
        },
        adminCompany: {
          identifier : 'adminCompany',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the organisation')
            }
          ]
        },
        adminBillingAddress: {
          identifier : 'adminBillingAddress',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the Address')
            }
          ]
        },
        adminBillingCity: {
          identifier : 'adminBillingCity',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the city')
            }
          ]
        },

        adminBillingZip: {
          identifier : 'adminBillingZip',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the ZIP code')
            }
          ]
        }
      }
    };
  }

  @action
  submit(e) {
    e.preventDefault();
    this.onValid(() => {
      this.save();
    });
  }
}
