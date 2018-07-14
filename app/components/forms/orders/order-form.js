import Component from '@ember/component';
import { set, computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { orderBy } from 'lodash';

export default Component.extend(FormMixin, {
  buyer: computed('data.user', function() {
    return this.get('data.user');
  }),
  holders: computed('data.attendees', function() {
    return this.get('data.attendees');
  }),
  isPaidOrder: computed('data', function() {
    return this.get('data.amount') !== 0;
  }),
  sameAsBuyer: true,
  getValidationRules() {
    let firstNameValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.get('l10n').t('Please enter your first name')
        }
      ]
    };
    let lastNameValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.get('l10n').t('Please enter your last name')
        }
      ]
    };
    let emailValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.get('l10n').t('Please enter your email')
        }
      ]
    };
    let validationRules = {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        firstName: {
          identifier : 'first_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your first name')
            }
          ]
        },
        lastName: {
          identifier : 'last_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your last name')
            }
          ]
        },
        email: {
          identifier : 'email',
          rules      : [
            {
              type   : 'email',
              prompt : this.get('l10n').t('Please enter a valid email address')
            }
          ]
        },
        country: {
          identifier : 'country',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your country')
            }
          ]
        },
        address: {
          identifier : 'address',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your address')
            }
          ]
        },
        city: {
          identifier : 'city',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your city ')
            }
          ]
        },
        state: {
          identifier : 'state',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your state')
            }
          ]
        },
        zipCode: {
          identifier : 'zip_code',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your zip code')
            }
          ]
        },
        payVia: {
          identifier : 'pay_via',
          rules      : [
            {
              type   : 'checked',
              prompt : this.get('l10n').t('Please specify your choice of payment method ')
            }
          ]
        }
      }
    };
    this.holders.forEach((value, index) => {
      validationRules.fields[`first_name_${index}`] = firstNameValidation;
      validationRules.fields[`last_name_${index}`] = lastNameValidation;
      validationRules.fields[`email_${index}`] = emailValidation;
    });
    return validationRules;
  },
  countries: computed(function() {
    return orderBy(countries, 'name');
  }),
  actions: {
    submit() {
      this.onValid(() => {
      });
    },
    removeHolderData(holder) {
      if (this.get('sameAsBuyer')) {
        set(holder, 'firstName', null);
        set(holder, 'lastName', null);
        set(holder, 'email', null);
      }
    }
  }
});
