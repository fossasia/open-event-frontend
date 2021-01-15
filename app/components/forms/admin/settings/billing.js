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
        adminBillingContactName: {
          identifier : 'adminBillingContactName',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the Contact name')
            }
          ]
        },
        adminBillingPhone: {
          identifier : 'adminBillingPhone',
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
        adminBillingCountry: {
          identifier : 'adminBillingCountry',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select the country')
            }
          ]
        },

        adminBillingTaxInfo: {
          identifier : 'adminBillingTaxInfo',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the tax id')
            }
          ]
        },
        adminCompany: {
          identifier : 'adminCompany',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the company')
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
              prompt : this.l10n.t('Please enter the zip code')
            }
          ]
        }
      }
    };
  }

  @action
  submit() {
    this.onValid(() => {
      this.save();
    });
  }
}
