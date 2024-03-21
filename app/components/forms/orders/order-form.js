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
import { nativeLanguage } from 'open-event-frontend/utils/dictionary/native-language';
import { fluentLanguage } from 'open-event-frontend/utils/dictionary/fluent-language';
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
    return this.data.attendees;
  }),
  isPaidOrder: computed('data', function() {
    if (!this.data.amount) {
      this.data.set('paymentMode', 'free');
      return false;
    }
    return true;
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
          prompt : this.l10n.t('Please select categories that describe your gender identity.')
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
          type   : 'checked',
          prompt : this.l10n.t('Please enter Code of conduct consent.')
        }
      ]
    };

    const isConsentOfRefundPolicyValidation = {
      optional : true,
      rules    : [
        {
          type   : 'checked',
          prompt : this.l10n.t('Please consent to the Refund Policy.')
        }
      ]
    };

    const nativeLanguageValidation = {
      rules: [
        {
          type   : 'empty',
          prompt : this.l10n.t('Please enter Language Form.')
        }
      ]
    };

    const fluentLanguageValidation = {
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
    const validationMap = {
      firstname                   : firstNameValidation,
      lastname                    : lastNameValidation,
      email                       : emailValidation,
      gender                      : genderValidation,
      ageGroups                   : ageGroupValidation,
      address                     : addressValidation,
      acceptReceiveEmails         : acceptReceiveEmailsValidation,
      acceptVideoRecording        : acceptVideoRecordingValidation,
      acceptShareDetails          : acceptShareDetailsValidation,
      city                        : cityValidation,
      state                       : stateValidation,
      country                     : countryValidation,
      jobTitle                    : jobTitleValidation,
      phone                       : phoneValidation,
      taxBusinessInfo             : taxBusinessInfoValidation,
      billingAddress              : billingAddressValidation,
      homeAddress                 : homeAddressValidation,
      homeWiki                    : homeWikiValidation,
      wikiScholarship             : wikiScholarshipValidation,
      shippingAddress             : shippingAddressValidation,
      company                     : companyValidation,
      workAddress                 : workAddressValidation,
      workPhone                   : workPhoneValidation,
      website                     : websiteRequiredValidation,
      blog                        : blogRequiredValidation,
      twitter                     : twitterRequiredValidation,
      facebook                    : facebookRequiredValidation,
      github                      : githubRequiredValidation,
      instagram                   : instagramRequiredValidation,
      linkedin                    : linkedinRequiredValidation,
      native_language             : nativeLanguageValidation,
      fluent_language             : fluentLanguageValidation,
      is_consent_form_field       : isConsentFormFieldValidation,
      is_consent_of_refund_policy : isConsentOfRefundPolicyValidation

    };
    this.allFields.attendee.forEach((field, index) => {
      const { fieldIdentifier } = field;
      const validationRuleKey = `${fieldIdentifier}_required_${index}`;
      if (validationMap[fieldIdentifier]) {
        validationRules.fields[validationRuleKey] = validationMap[fieldIdentifier];
      } else {
        if (field.type === 'checkbox') {
          validationRules.fields[`${field.fieldIdentifier}_required_${index}`] = {
            rules: [
              {
                type   : 'checked',
                prompt : this.l10n.t('Please select your {{field}}.', { field: field.name })
              }
            ]
          };
        } else {
          validationRules.fields[`${field.fieldIdentifier}_required_${index}`] = {
            rules: [
              {
                type   : 'empty',
                prompt : this.l10n.t('Please enter your {{field}}.', { field: field.name })
              }
            ]
          };
        }
      }
    });
    return validationRules;
  },
  allFields: computed('fields', function() {
    const requiredFixed = this.fields.toArray()?.filter(field => field.isFixed);
    const current_locale = this.cookies.read('current_locale');

    const customFields =  orderBy(this.fields.toArray()?.filter(field => {
      const { isFixed, main_language } = field;
      field.nameConvert = field.name;
      if (field.name === 'Consent of refund policy') {
        field.nameConvert = 'I agree to the terms of the refund policy of the event.';
      }
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

  genders         : orderBy(genders, 'position'),
  ageGroups       : orderBy(ageGroups, 'position'),
  countries       : orderBy(countries, 'name'),
  nativeLanguage  : orderBy(nativeLanguage, 'position'),
  fluentLanguage  : orderBy(fluentLanguage, 'position'),
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
    triggerSameAsBuyerOption(holder) {
      holder.set('sameAsBuyer', !holder.sameAsBuyer);
      if (holder.sameAsBuyer) {
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
    },
    updateGendersSelection(checked, changed, selectedOptions, holder, field) {
      holder.set(field.fieldIdentifier, selectedOptions.map(select => select.value).join(','));
    }
  },
  willDestroyElement() {
    clearInterval(this._getRemainingTimeId);
    this._super(...arguments);
  }

});
