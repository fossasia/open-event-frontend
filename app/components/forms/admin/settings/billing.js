import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { action } from '@ember/object';

export default class extends Component.extend(FormMixin) {
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
              type   : 'empty',
              prompt : this.l10n.t('Please enter a phone number')
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
              prompt : this.l10n.t('Please enter the country')
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
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Please enter a valid zip code')
            }
          ]
        },
        adminBillingState: {
          identifier : 'adminBillingState',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the state')
            }
          ]
        },
        adminBillingAdditionalInfo: {
          identifier : 'adminBillingAdditionalInfo',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter additional info')
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
