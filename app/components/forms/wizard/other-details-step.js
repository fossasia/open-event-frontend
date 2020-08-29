import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';
import { merge, orderBy, find } from 'lodash-es';
import { licenses } from 'open-event-frontend/utils/dictionary/licenses';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';
import $ from 'jquery';

export default Component.extend(FormMixin, EventWizardMixin, {

  currentTimezone: moment.tz.guess(),
  timezones,

  torii: service(),

  deletedTickets: [],

  licenses: computed(function() {
    return orderBy(licenses, 'name');
  }),


  socialLinks: computed('data.event.socialLinks.@each.isDeleted', function() {
    return this.data.event.socialLinks.filterBy('isDeleted', false);
  }),

  isUserUnverified: computed('authManager.currentUser.isVerified', function() {
    return !this.authManager.currentUser.isVerified;
  }),
  /**
   * returns the validation rules for the social links.
   */
  socialLinksValidationRules: computed('socialLinks', function() {
    let validationRules = {};
    for (let i = 0; i < this.socialLinks.length; i++) {
      validationRules = merge(validationRules, {
        [this.socialLinks.get(i).identifier]: {
          identifier : this.socialLinks.get(i).identifier,
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        }
      });
    }

    return validationRules;
  }),


  showDraftButton: computed('data.event.state', function() {
    return this.data.event.state !== 'published';
  }),

  hasCodeOfConduct: computed('data.event.codeOfConduct', function() {
    return !!this.data.event.codeOfConduct;
  }),

  didInsertElement() {
    if (!this.isCreate && this.data.event.copyright && !this.data.event.copyright.content) {
      this.set('data.event.copyright', this.store.createRecord('event-copyright'));
    }
  },

  // TODO: Removing the Event Time Validations due to the weird and buggy behaviour. Will be restored once a perfect solution is found. Please check issue: https://github.com/fossasia/open-event-frontend/issues/3667
  getValidationRules() {
    $.fn.form.settings.rules.checkMaxMinPrice = () => {
      return $('.ui.form').form('get value', 'min_price') <= $('.ui.form').form('get value', 'max_price');
    };
    $.fn.form.settings.rules.checkMaxMinOrder = () => {
      return $('.ui.form').form('get value', 'ticket_min_order') <= $('.ui.form').form('get value', 'ticket_max_order');
    };

    const validationRules = {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        name: {
          identifier : 'name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give your event a name')
            }
          ]
        },
        location: {
          identifier : 'location',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Location is required to save an event')
            }
          ]
        },
        timezone: {
          identifier : 'timezone',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Choose a timezone for your event')
            }
          ]
        },
        startDate: {
          identifier : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please tell us when your event starts')
            },
            {
              type   : 'date',
              prompt : this.l10n.t('Please give a valid start date')
            }
          ]
        },
        endDate: {
          identifier : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please tell us when your event ends')
            },
            {
              type   : 'date',
              prompt : this.l10n.t('Please give a valid end date')
            }
          ]
        },
        startTime: {
          identifier : 'start_time',
          depends    : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give a start time')
            }
          ]
        },
        endTime: {
          identifier : 'end_time',
          depends    : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give an end time')
            }
          ]
        },
        ticketName: {
          identifier : 'ticket_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give your ticket a name')
            }
          ]
        },
        ticketDescription: {
          identifier : 'ticket_description',
          optional   : true,
          rules      : [
            {
              type   : 'maxLength[160]',
              prompt : this.l10n.t('Ticket description shouldn\'t contain more than {ruleValue} characters')
            }
          ]
        },
        ticketPrice: {
          identifier : 'ticket_price',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give your ticket a price')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Please give a proper price for you ticket')
            },
            {
              type   : 'decimal[0..]',
              prompt : this.l10n.t('Ticket price should be greater than 0')
            }
          ]
        },
        ticketQuantity: {
          identifier : 'ticket_quantity',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please specify how many tickets of this type are available')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Please give a proper quantity for you ticket')
            }
          ]
        },
        ticketMinOrder: {
          identifier : 'ticket_min_order',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Minimum tickets per order required')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Invalid number')
            },
            {
              type   : 'checkMaxMinOrder',
              prompt : this.l10n.t('Minimum order should not be greater than maximum')
            }
          ]
        },
        ticketMaxOrder: {
          identifier : 'ticket_max_order',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Maximum tickets per order required')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Invalid number')
            },
            {
              type   : 'integer[1..]',
              prompt : this.l10n.t('Maximum tickets per order should be greater than 0')
            },
            {
              type   : 'checkMaxMinOrder',
              prompt : this.l10n.t('Maximum order should not be less than minimum')
            }
          ]
        },
        minPrice: {
          identifier : 'min_price',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Minimum price for donation tickets required')
            },
            {
              type   : 'integer[1..]',
              prompt : this.l10n.t('Minimum price needs to be greater than zero')
            },
            {
              type   : 'checkMaxMinPrice',
              prompt : this.l10n.t('Minimum price should not be greater than maximum')
            }
          ]
        },
        maxPrice: {
          identifier : 'max_price',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Maximum price for donation tickets required')
            },
            {
              type   : 'integer[1..]',
              prompt : this.l10n.t('Maximum price needs to be greater than zero')
            },
            {
              type   : 'checkMaxMinPrice',
              prompt : this.l10n.t('Maximum price should not be less than minimum')
            }
          ]
        },
        paypalEmail: {
          identifier : 'paypal_email',
          rules      : [
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email')
            },
            {
              type   : 'empty',
              prompt : this.l10n.t('Please fill your paypal email for payment of tickets.')
            }
          ]
        },
        onSiteDetails: {
          identifier : 'on_site_details',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please fill the details for payment of tickets.')
            }
          ]
        },
        bankDetails: {
          identifier : 'bank_details',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please fill the bank details for payment of tickets.')
            }
          ]
        },
        chequeDetails: {
          identifier : 'cheque_details',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please fill the cheque details for payment of tickets.')
            }
          ]
        },
        externalEventIdentifier: {
          identifier : 'external_event_url',
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        paymentCountry: {
          identifier : 'payment_country',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select your country')
            }
          ]
        }
      }
    };
    // Merging the predetermined rules with the rules for social links.
    validationRules.fields = merge(validationRules.fields, this.socialLinksValidationRules);
    return validationRules;
  },

  actions: {
    async updateCopyright(name) {
      const { event } = this.data;
      const copyright = await this.getOrCreate(event, 'copyright', 'event-copyright');
      const license = find(licenses, { name });
      copyright.setProperties({
        licence    : name,
        logoUrl    : license.logoUrl,
        licenceUrl : license.link
      });
    },
    onChange() {
      this.onValid(() => {});
    },
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save');
      });
    },
    move(direction) {
      this.onValid(() => {
        this.sendAction('move', direction);
      });
    },
    publish() {
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.sendAction('save');
      });
    }
  }
});
