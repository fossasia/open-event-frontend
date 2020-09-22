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
