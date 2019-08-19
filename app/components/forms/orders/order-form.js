import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly, oneWay } from '@ember/object/computed';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import FormMixin from 'open-event-frontend/mixins/form';
import moment from 'moment';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { groupBy, orderBy } from 'lodash-es';
import {
  compulsoryProtocolValidUrlPattern, validTwitterProfileUrlPattern, validFacebookProfileUrlPattern,
  validGithubProfileUrlPattern
} from 'open-event-frontend/utils/validators';
import { genders } from 'open-event-frontend/utils/dictionary/genders';

export default Component.extend(FormMixin, {
  router: service(),

  buyerFirstName    : oneWay('buyerHasFirstName'),
  buyerLastName     : oneWay('buyerHasLastName'),
  buyer             : readOnly('data.user'),
  buyerHasFirstName : readOnly('data.user.firstName'),
  buyerHasLastName  : readOnly('data.user.lastName'),
  holders           : computed('data.attendees', function() {
    this.get('data.attendees').forEach(attendee => {
      attendee.set('firstname', '');
      attendee.set('lastname', '');
      attendee.set('email', '');
    });
    return this.get('data.attendees');
  }),
  isPaidOrder: computed('data', function() {
    if (!this.get('data.amount')) {
      this.data.set('paymentMode', 'free');
      return false;
    }
    return true;
  }),
  sameAsBuyer: false,

  getRemainingTime: computed('settings', function() {
    let orderExpiryTime = this.get('settings.orderExpiryTime');
    let willExpireAt = this.get('data.createdAt').add(orderExpiryTime, 'minutes');
    this.timer(willExpireAt, this.get('data.identifier'));
  }),

  timer(willExpireAt, orderIdentifier) {
    run.later(() => {
      let currentTime = moment();
      let diff = moment.duration(willExpireAt.diff(currentTime));
      this.set('getRemainingTime', moment.utc(diff.asMilliseconds()).format('mm:ss'));
      if (diff > 0) {
        this.timer(willExpireAt, orderIdentifier);
      } else {
        this.data.reload();
        this.router.transitionTo('orders.expired', orderIdentifier);
      }
    }, 1000);
  },

  getValidationRules() {
    let firstNameValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your first name')
        }
      ]
    };
    let lastNameValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your last name')
        }
      ]
    };
    let emailValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your email')
        },
        {
          type   : 'email',
          prompt : this.l10n.t('Please enter a valid email')
        }
      ]
    };

    let genderValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please select a gender')
        }
      ]
    };

    let addressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your address')
        }
      ]
    };

    let cityValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your city')
        }
      ]
    };

    let stateValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your state')
        }
      ]
    };

    let countryValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your country')
        }
      ]
    };

    let jobTitleValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your job title')
        }
      ]
    };

    let phoneValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter a mobile number')
        }
      ]
    };

    let taxBusinessInfoValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your tax business info')
        }
      ]
    };

    let billingAddressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your billing address')
        }
      ]
    };

    let homeAddressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your home address')
        }
      ]
    };

    let shippingAddressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your shipping address')
        }
      ]
    };

    let companyValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your company')
        }
      ]
    };

    let workAddressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your work address')
        }
      ]
    };

    let workPhoneValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your work phone')
        }
      ]
    };

    let websiteValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : compulsoryProtocolValidUrlPattern,
          prompt : this.l10n.t('Please enter a valid url')
        }
      ]
    };

    let websiteRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter url of website')
        },
        {
          type   : 'regExp',
          value  : compulsoryProtocolValidUrlPattern,
          prompt : this.l10n.t('Please enter a valid url')
        }
      ]
    };

    let blogValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : compulsoryProtocolValidUrlPattern,
          prompt : this.l10n.t('Please enter a valid url')
        }
      ]
    };

    let blogRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter url of website')
        },
        {
          type   : 'regExp',
          value  : compulsoryProtocolValidUrlPattern,
          prompt : this.l10n.t('Please enter a valid url')
        }
      ]
    };

    let twitterValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : validTwitterProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid twitter profile url')
        }
      ]
    };

    let twitterRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter twitter link')
        },
        {
          type   : 'regExp',
          value  : validTwitterProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid twitter profile url')
        }
      ]
    };

    let facebookValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : validFacebookProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid facebook account url')
        }
      ]
    };

    let facebookRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter facebook link')
        },
        {
          type   : 'regExp',
          value  : validFacebookProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid facebook account url')
        }
      ]
    };

    let githubValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : validGithubProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid GitHub profile url')
        }
      ]
    };

    let githubRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter GitHub link')
        },
        {
          type   : 'regExp',
          value  : validGithubProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid GitHub profile url')
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
              prompt : this.l10n.t('Please enter your first name')
            }
          ]
        },
        lastName: {
          identifier : 'last_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your last name')
            }
          ]
        },
        email: {
          identifier : 'email',
          rules      : [
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address')
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
              prompt : this.l10n.t('Please enter your address')
            }
          ]
        },
        city: {
          identifier : 'city',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your city ')
            }
          ]
        },
        zipCode: {
          identifier : 'zip_code',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your zip code')
            }
          ]
        },
        payVia: {
          identifier : 'payment_mode',
          rules      : [
            {
              type   : 'checked',
              prompt : this.l10n.t('Please specify your choice of payment method ')
            }
          ]
        }
      }
    };
    this.holders.forEach((value, index) => {
      validationRules.fields[`firstname_required_${index}`] = firstNameValidation;
      validationRules.fields[`lastname_required_${index}`] = lastNameValidation;
      validationRules.fields[`email_required_${index}`] = emailValidation;
      validationRules.fields[`gender_required_${  index}`] = genderValidation;
      validationRules.fields[`address_required_${  index}`] = addressValidation;
      validationRules.fields[`city_required_${  index}`] = cityValidation;
      validationRules.fields[`state_required_${  index}`] = stateValidation;
      validationRules.fields[`country_required_${  index}`] = countryValidation;
      validationRules.fields[`jobTitle_required_${  index}`] = jobTitleValidation;
      validationRules.fields[`phone_required_${  index}`] = phoneValidation;
      validationRules.fields[`taxBusinessInfo_required_${  index}`] = taxBusinessInfoValidation;
      validationRules.fields[`billingAddress_required_${  index}`] = billingAddressValidation;
      validationRules.fields[`homeAddress_required_${  index}`] = homeAddressValidation;
      validationRules.fields[`shippingAddress_required_${  index}`] = shippingAddressValidation;
      validationRules.fields[`company_required_${  index}`] = companyValidation;
      validationRules.fields[`workAddress_required_${  index}`] = workAddressValidation;
      validationRules.fields[`workPhone_required_${  index}`] = workPhoneValidation;
      validationRules.fields[`website_${  index}`] = websiteValidation;
      validationRules.fields[`website_required_${  index}`] = websiteRequiredValidation;
      validationRules.fields[`blog_${  index}`] = blogValidation;
      validationRules.fields[`blog_required_${  index}`] = blogRequiredValidation;
      validationRules.fields[`twitter_${  index}`] = twitterValidation;
      validationRules.fields[`twitter_required_${  index}`] = twitterRequiredValidation;
      validationRules.fields[`facebook_${  index}`] = facebookValidation;
      validationRules.fields[`facebook_required_${  index}`] = facebookRequiredValidation;
      validationRules.fields[`github_${  index}`] = githubValidation;
      validationRules.fields[`github_required_${  index}`] = githubRequiredValidation;
    });
    return validationRules;
  },

  allFields: computed('fields', function() {
    return groupBy(this.fields.toArray(), field => field.get('form'));
  }),

  countries: computed(function() {
    return orderBy(countries, 'name');
  }),

  genders: orderBy(genders, 'name'),

  actions: {
    submit(data) {
      this.onValid(() => {
        let currentUser = this.get('data.user');
        currentUser.set('firstName', this.buyerFirstName);
        currentUser.set('lastName', this.buyerLastName);
        this.sendAction('save', data);
      });
    },
    modifyHolder(holder) {
      if (this.sameAsBuyer) {
        holder.set('firstname', this.buyerFirstName);
        holder.set('lastname', this.buyerLastName);
        holder.set('email', this.buyer.content.email);
      } else {
        holder.set('firstname', '');
        holder.set('lastname', '');
        holder.set('email', '');
      }
    }
  }
});