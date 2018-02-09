import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';
import { countries } from 'open-event-frontend/utils/dictionary/demography';

const { Component, computed, set } = Ember;

export default Component.extend(FormMixin, {
  buyer: {
    firstName : '',
    lastName  : '',
    email     : ''
  },
  holders: [
    {
      firstName   : '',
      lastName    : '',
      email       : '',
      sameAsBuyer : ''
    },
    {
      firstName   : '',
      lastName    : '',
      email       : '',
      sameAsBuyer : ''
    },
    {
      firstName   : '',
      lastName    : '',
      email       : '',
      sameAsBuyer : ''
    }
  ],
  getValidationRules() {
    let firstNameValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.i18n.t('Please enter your first name')
        }
      ]
    };
    let lastNameValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.i18n.t('Please enter your last name')
        }
      ]
    };
    let emailValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.i18n.t('Please enter your email')
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
              prompt : this.i18n.t('Please enter your first name')
            }
          ]
        },
        lastName: {
          identifier : 'last_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter your last name')
            }
          ]
        },
        email: {
          identifier : 'email',
          rules      : [
            {
              type   : 'email',
              prompt : this.i18n.t('Please enter a valid email address')
            }
          ]
        },
        country: {
          identifier : 'country',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter your country')
            }
          ]
        },
        address: {
          identifier : 'address',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter your address')
            }
          ]
        },
        city: {
          identifier : 'city',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter your city ')
            }
          ]
        },
        state: {
          identifier : 'state',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter your state')
            }
          ]
        },
        zipCode: {
          identifier : 'zip_code',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter your zip code')
            }
          ]
        },
        payVia: {
          identifier : 'pay_via',
          rules      : [
            {
              type   : 'checked',
              prompt : this.i18n.t('Please specify your choice of payment method ')
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
    return countries;
  }),
  actions: {
    submit() {
      this.onValid(() => {
      });
    },
    fillHolderData(holder, isCheckboxChecked) {
      if (isCheckboxChecked) {
        set(holder, 'firstName', this.get('buyer.firstName'));
        set(holder, 'lastName', this.get('buyer.lastName'));
        set(holder, 'email', this.get('buyer.email'));
        set(holder, 'sameAsBuyer', true);
      }
    }
  }
});
