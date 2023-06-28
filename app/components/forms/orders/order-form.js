import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly, oneWay } from '@ember/object/computed';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import FormMixin from 'open-event-frontend/mixins/form';
import moment from 'moment-timezone';
import { groupBy, orderBy } from 'lodash-es';
import {
  compulsoryProtocolValidUrlPattern, validTwitterProfileUrlPattern, validFacebookProfileUrlPattern,
  validGithubProfileUrlPattern, validInstagramProfileUrlPattern, validLinkedinProfileUrlPattern, validEmail
} from 'open-event-frontend/utils/validators';
import { genders } from 'open-event-frontend/utils/dictionary/genders';
import { ageGroups } from 'open-event-frontend/utils/dictionary/age-groups';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { years } from 'open-event-frontend/utils/dictionary/year-list';
import { languageForms } from 'open-event-frontend/utils/dictionary/language-form';
import { homeWikis } from 'open-event-frontend/utils/dictionary/home-wikis';
import { booleanComplex } from 'open-event-frontend/utils/dictionary/boolean_complex';
import { wikiScholarship } from 'open-event-frontend/utils/dictionary/wiki-scholarship';

export default Component.extend(FormMixin, {
  router             : service(),
  autoScrollToErrors : false,

  buyerFirstName    : oneWay('buyerHasFirstName'),
  buyerLastName     : oneWay('buyerHasLastName'),
  buyer             : readOnly('data.user'),
  buyerHasFirstName : readOnly('data.user.firstName'),
  buyerHasLastName  : readOnly('data.user.lastName'),
  holders           : computed('data.attendees', 'buyer', function() {
    this.data.attendees.forEach((attendee, index) => {
      if (index === 0 && this.buyerFirstName && this.buyerLastName) {
        attendee.set('firstname', this.buyerFirstName);
        attendee.set('lastname', this.buyerLastName);
        attendee.set('email', this.buyer.get('email'));
      } else {
        attendee.set('firstname', '');
        attendee.set('lastname', '');
        attendee.set('email', '');
      }
    });
    return this.data.attendees;
  }),
  isPaidOrder: computed('data', function() {
    if (!this.data.amount) {
      this.data.set('paymentMode', 'free');
      return false;
    }
    return true;
  }),
  sameAsBuyer: computed('data', function() {
    return (this.buyerHasFirstName && this.buyerHasLastName);
  }),

  isBillingInfoNeeded: computed('event', 'data.isBillingEnabled', function() {
    return this.event.isBillingInfoMandatory || this.data.isBillingEnabled;
  }),

  getRemainingTime: computed('settings', function() {
    const { orderExpiryTime } = this.settings;
    const willExpireAt = this.data.createdAt.add(orderExpiryTime, 'minutes');
    this.timer(willExpireAt, this.data.identifier);
  }),

  timer(willExpireAt, orderIdentifier) {
    run.later(() => {
      if (this.session.currentRouteName !== 'orders.new') {
        return;
      }
      const currentTime = moment();
      const diff = moment.duration(willExpireAt.diff(currentTime));
      if (diff > 0) {
        this.set('getRemainingTime', moment.utc(diff.asMilliseconds()).format('mm:ss'));
        this.timer(willExpireAt, orderIdentifier);
      } else {
        this.set('getRemainingTime', '00:00');
        this.data.set('status', 'expired');
        this.data.reload();
        this.router.transitionTo('orders.expired', orderIdentifier);
      }
    }, 1000);
  },

  getValidationRules() {
    const firstNameValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your first name.')
        }
      ]
    };
    const lastNameValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your last name.')
        }
      ]
    };
    const emailValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your email.')
        },
        {
          type   : 'regExp',
          value  : validEmail,
          prompt : this.l10n.t('Please enter a valid email address.')
        }
      ]
    };

    const genderValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please select a gender.')
        }
      ]
    };

    const ageGroupValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please select your age group.')
        }
      ]
    };

    const acceptReceiveEmailsValidation = {
      rules: [
        {
          type   : 'checked',
          value  : false,
          prompt : this.l10n.t('You need to agree to the condition of the organizer to receive emails in order to continue the order process.')
        }
      ]
    };

    const acceptVideoRecordingValidation = {
      rules: [
        {
          type   : 'checked',
          value  : false,
          prompt : this.l10n.t('In order to complete the order process you need to agree to the photo & video & text consent.')
        }
      ]
    };

    const acceptShareDetailsValidation = {
      rules: [
        {
          type   : 'checked',
          value  : false,
          prompt : this.l10n.t('You need to agree to the condition of the organizer to share information among event partners in order to continue the order process. Such a requirement could be necessary in order to provide the event services.')
        }
      ]
    };

    const addressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your address.')
        }
      ]
    };

    const cityValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your city.')
        }
      ]
    };

    const stateValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your state.')
        }
      ]
    };

    const countryValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please select your country.')
        }
      ]
    };

    const jobTitleValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your job title.')
        }
      ]
    };

    const phoneValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter a mobile number.')
        }
      ]
    };

    const taxBusinessInfoValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your tax business info.')
        }
      ]
    };

    const billingAddressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your billing address.')
        }
      ]
    };

    const homeAddressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your home address.')
        }
      ]
    };

    const homeWikiValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your home wiki.')
        }
      ]
    };
    const wikiScholarshipValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your wiki scholarship.')
        }
      ]
    };

    const shippingAddressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your shipping address.')
        }
      ]
    };

    const companyValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your organisation.')
        }
      ]
    };

    const workAddressValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your work address.')
        }
      ]
    };

    const workPhoneValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter your work phone.')
        }
      ]
    };

    const websiteValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : compulsoryProtocolValidUrlPattern,
          prompt : this.l10n.t('Please enter a valid URL.')
        }
      ]
    };

    const websiteRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter URL of website.')
        },
        {
          type   : 'regExp',
          value  : compulsoryProtocolValidUrlPattern,
          prompt : this.l10n.t('Please enter a valid URL.')
        }
      ]
    };

    const blogValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : compulsoryProtocolValidUrlPattern,
          prompt : this.l10n.t('Please enter a valid URL.')
        }
      ]
    };

    const blogRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter URL of website.')
        },
        {
          type   : 'regExp',
          value  : compulsoryProtocolValidUrlPattern,
          prompt : this.l10n.t('Please enter a valid URL.')
        }
      ]
    };

    const twitterValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : validTwitterProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid Twitter profile URL.')
        }
      ]
    };

    const twitterRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter Twitter link.')
        },
        {
          type   : 'regExp',
          value  : validTwitterProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid Twitter profile URL.')
        }
      ]
    };

    const facebookValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : validFacebookProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid Facebook account URL.')
        }
      ]
    };

    const facebookRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter Facebook link.')
        },
        {
          type   : 'regExp',
          value  : validFacebookProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid Facebook account URL.')
        }
      ]
    };

    const githubValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : validGithubProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid GitHub profile URL.')
        }
      ]
    };

    const githubRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter GitHub link.')
        },
        {
          type   : 'regExp',
          value  : validGithubProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid GitHub profile URL.')
        }
      ]
    };

    const instagramValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : validInstagramProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid Instagram account URL.')
        }
      ]
    };

    const instagramRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter Instagram link')
        },
        {
          type   : 'regExp',
          value  : validInstagramProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid Instagram account URL.')
        }
      ]
    };

    const linkedinValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : validLinkedinProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid Linkedin account URL.')
        }
      ]
    };

    const linkedinRequiredValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter Linkedin link.')
        },
        {
          type   : 'regExp',
          value  : validLinkedinProfileUrlPattern,
          prompt : this.l10n.t('Please enter a valid Linkedin account URL.')
        }
      ]
    };

    const isConsentFormFieldValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter Consent form field.')
        }
      ]
    };

    const isConsentOfRefundPolicyValidation = {
      optional : true,
      rules    : [
        {
          type   : 'regExp',
          value  : compulsoryProtocolValidUrlPattern,
          prompt : this.l10n.t('Please consent to the Refund Policy.')
        }
      ]
    };

    const languageForm1Validation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter Language Form.')
        }
      ]
    };

    const languageForm2Validation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter Language Form.')
        }
      ]
    };

    const validationRules = {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        firstName: {
          identifier : 'first_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your first name.')
            }
          ]
        },
        lastName: {
          identifier : 'last_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your last name.')
            }
          ]
        },
        email: {
          identifier : 'email',
          rules      : [
            {
              type   : 'regExp',
              value  : validEmail,
              prompt : this.l10n.t('Please enter a valid email address.')
            }
          ]
        },
        country: {
          identifier : 'country',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select your country.')
            }
          ]
        },
        taxBusinessInfo: {
          identifier : 'taxBusinessInfo',
          optional   : true
        },
        address: {
          identifier : 'address',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your address.')
            }
          ]
        },
        city: {
          identifier : 'city',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your city.')
            }
          ]
        },
        zipCode: {
          identifier : 'zip_code',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your ZIP code.')
            }
          ]
        },
        payVia: {
          identifier : 'payment_mode',
          rules      : [
            {
              type   : 'checked',
              prompt : this.l10n.t('Please specify your choice of payment method.')
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
      validationRules.fields[`ageGroup_required_${  index}`] = ageGroupValidation;
      validationRules.fields[`address_required_${  index}`] = addressValidation;
      validationRules.fields[`acceptReceiveEmails_required_${  index}`] = acceptReceiveEmailsValidation;
      validationRules.fields[`acceptVideoRecording_required_${  index}`] = acceptVideoRecordingValidation;
      validationRules.fields[`acceptShareDetails_required_${  index}`] = acceptShareDetailsValidation;
      validationRules.fields[`city_required_${  index}`] = cityValidation;
      validationRules.fields[`state_required_${  index}`] = stateValidation;
      validationRules.fields[`country_required_${  index}`] = countryValidation;
      validationRules.fields[`jobTitle_required_${  index}`] = jobTitleValidation;
      validationRules.fields[`phone_required_${  index}`] = phoneValidation;
      validationRules.fields[`taxBusinessInfo_required_${  index}`] = taxBusinessInfoValidation;
      validationRules.fields[`billingAddress_required_${  index}`] = billingAddressValidation;
      validationRules.fields[`homeAddress_required_${  index}`] = homeAddressValidation;
      validationRules.fields[`homeWiki_required_${  index}`] = homeWikiValidation;
      validationRules.fields[`wikiScholarship_required_${  index}`] = wikiScholarshipValidation;
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
      validationRules.fields[`instagram_${  index}`] = instagramValidation;
      validationRules.fields[`instagram_required_${  index}`] = instagramRequiredValidation;
      validationRules.fields[`linkedin_${  index}`] = linkedinValidation;
      validationRules.fields[`linkedin_required_${  index}`] = linkedinRequiredValidation;
      validationRules.fields[`language_form_1_required_${  index}`] = languageForm1Validation;
      validationRules.fields[`language_form_2_required_${  index}`] = languageForm2Validation;
      validationRules.fields[`is_consent_form_field_required_${  index}`] = isConsentFormFieldValidation;
      validationRules.fields[`is_consent_of_refund_policy_required_${  index}`] = isConsentOfRefundPolicyValidation;
      this.allFields.attendee.filter(field => field.isComplex && field.isRequired).forEach(field => {
        validationRules.fields[`${field.fieldIdentifier}_required_${index}`] = {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter {{field}}.', { field: field.name })
            }
          ]
        };
      });

    });
    return validationRules;
  },

  allFields: computed('fields', function() {
    const requiredFixed = this.fields.toArray()?.filter(field => field.isFixed);
    const current_locale = this.cookies.read('current_locale');

    const customFields =  orderBy(this.fields.toArray()?.filter(field => {
      const { isFixed, main_language } = field;

      if ((main_language && main_language.split('-')[0] === current_locale) || !field.translations || !field.translations.length) {
        field.transName = field.name;
      } else if (field.translations?.length) {

        const transName = field.translations.filter(trans => trans.language_code.split('-')[0] === current_locale);

        if (transName.length) {
          field.transName = transName[0].name;
        } else {
          field.transName = field.name;
        }
      } else {
        field.transName = field.name;
      }

      return !isFixed;
    }), ['position']);
    return groupBy(requiredFixed.concat(customFields), field => field.get('form'));
  }),

  genders         : orderBy(genders, 'name'),
  ageGroups       : orderBy(ageGroups, 'position'),
  countries       : orderBy(countries, 'name'),
  years           : orderBy(years, 'year'),
  languageForms   : orderBy(languageForms, 'name'),
  homeWikis       : orderBy(homeWikis, 'item'),
  wikiScholarship : orderBy(wikiScholarship, 'position'),
  booleanComplex  : orderBy(booleanComplex, 'position'),

  currentLocale: computed('cookies.current_locale', function() {
    return this.cookies.read('current_locale');
  }),

  getData() {
    return 'hello';
  },

  actions: {
    submit(data) {
      this.onValid(() => {
        const currentUser = this.data.user;
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
    },
    updateLanguageFormsSelection(checked, changed, selectedOptions, holder, field) {
      holder.set(field.fieldIdentifier, selectedOptions.map(select => select.value).join(','));
    }
  }
});
