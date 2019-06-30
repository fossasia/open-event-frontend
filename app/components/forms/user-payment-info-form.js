import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { validPhoneNumber } from 'open-event-frontend/utils/validators';

export default Component.extend(FormMixin, {

  async init() {
    this._super(...arguments);
    let actualUser = await this.authManager.currentUser;
    let userBillingInfo = {
      billingContactName    : actualUser.billingContactName,
      billingCity           : actualUser.billingCity,
      billingPhone          : actualUser.billingPhone,
      company               : actualUser.company,
      billingTaxInfo        : actualUser.billingTaxInfo,
      billingAddress        : actualUser.billingAddress,
      billingZipCode        : actualUser.billingZipCode,
      billingAdditionalInfo : actualUser.billingAdditionalInfo
    };
    this.set('userBillingInfo', userBillingInfo);
    this.set('actualUser', actualUser);
  },

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        name: {
          identifier : 'contactName',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your name')
            }
          ]
        },
        company: {
          identifier : 'company',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your company')
            }
          ]
        },
        address: {
          identifier : 'address',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your billing address')
            }
          ]
        },
        city: {
          identifier : 'city',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your billing city')
            }
          ]
        },
        zipCode: {
          identifier : 'zip',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the zip code')
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
      this.onValid(async() => {
        try {
          this.actualUser.setProperties({
            billingAdditionalInfo : this.userBillingInfo.billingAdditionalInfo,
            billingZipCode        : this.userBillingInfo.billingZipCode,
            billingContactName    : this.userBillingInfo.billingContactName,
            billingPhone          : this.userBillingInfo.billingPhone,
            company               : this.userBillingInfo.company,
            billingTaxInfo        : this.userBillingInfo.billingTaxInfo,
            billingCity           : this.userBillingInfo.billingCity,
            billingAddress        : this.userBillingInfo.billingAddress
          });
          await this.actualUser.save();
          this.notify.success(this.l10n.t('Your billing details has been updated'));
        } catch (error) {
          this.actualUser.rollbackAttributes();
          this.notify.error(this.l10n.t('An unexpected error occurred'));
        }
      });
    }
  }
});
