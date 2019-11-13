import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { validPhoneNumber } from 'open-event-frontend/utils/validators';
import { pick, orderBy } from 'lodash-es';
import { action, computed } from '@ember/object';
import { countries } from 'open-event-frontend/utils/dictionary/demography';

export default class extends Component.extend(FormMixin) {
  didInsertElement() {
    super.didInsertElement(...arguments);
    this.set('userBillingInfo', pick(this.authManager.currentUser, ['billingContactName', 'billingCity', 'billingPhone', 'company', 'billingTaxInfo', 'billingCountry', 'billingState', 'billingAddress', 'billingZipCode', 'billingAdditionalInfo']));
  }

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
        country: {
          identifier : 'country',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your country')
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
  }

  @computed()
  get countries() {
    return orderBy(countries, 'name');
  }

  @action
  submit() {
    this.onValid(async() => {
      this.set('isLoading', true);
      try {
        this.authManager.currentUser.setProperties(this.userBillingInfo);
        await this.authManager.currentUser.save();
        this.notify.success(this.l10n.t('Your billing details has been updated'), {
          id: 'bill_det_updated'
        });
      } catch (error) {
        this.authManager.currentUser.rollbackAttributes();
        this.notify.error(this.l10n.t('An unexpected error occurred'), {
          id: 'bill_det_unexpect'
        });
      }
      this.set('isLoading', false);
    });
  }
}
