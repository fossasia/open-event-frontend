import Component from '@ember/component';
import { later } from '@ember/runloop';
import { observer, computed } from '@ember/object';
import moment from 'moment';
import { merge } from 'lodash-es';
import { licenses } from 'open-event-frontend/utils/dictionary/licenses';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';
import { paymentCountries, paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import FormMixin from 'open-event-frontend/mixins/form';
import { orderBy, filter, find } from 'lodash-es';
import { inject as service } from '@ember/service';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';

export default Component.extend(FormMixin, EventWizardMixin, {

  currentTimezone: moment.tz.guess(),
  timezones,

  torii: service(),

  licenses: computed(function() {
    return orderBy(licenses, 'name');
  }),

  countries: computed(function() {
    return orderBy(countries, 'name');
  }),

  paymentCountries: computed(function() {
    return orderBy(filter(countries, country => paymentCountries.includes(country.code)), 'name');
  }),

  paymentCurrencies: computed(function() {
    return orderBy(paymentCurrencies, 'name');
  }),

  canAcceptPayPal: computed('data.event.paymentCurrency', 'settings.isPaypalActivated', function() {
    return this.get('settings.isPaypalActivated') && find(paymentCurrencies, ['code', this.get('data.event.paymentCurrency')]).paypal;
  }),

  canAcceptStripe: computed('data.event.paymentCurrency', 'settings.isStripeActivated', function() {
    return this.get('settings.isStripeActivated') && find(paymentCurrencies, ['code', this.get('data.event.paymentCurrency')]).stripe;
  }),

  canAcceptOmise: computed('data.event.paymentCurrency', 'settings.isOmiseActivated', function() {
    return this.get('settings.isOmiseActivated') && find(paymentCurrencies, ['code', this.get('data.event.paymentCurrency')]).omise;
  }),

  canAcceptAliPay: computed('data.event.paymentCurrency', 'settings.isAliPayActivated', function() {
    return this.get('settings.isAliPayActivated') && find(paymentCurrencies, ['code', this.get('data.event.paymentCurrency')]).alipay;
  }),

  tickets: computed('data.event.tickets.@each.isDeleted', 'data.event.tickets.@each.position', function() {
    return this.get('data.event.tickets').sortBy('position').filterBy('isDeleted', false);
  }),

  socialLinks: computed('data.event.socialLinks.@each.isDeleted', function() {
    return this.get('data.event.socialLinks').filterBy('isDeleted', false);
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

  subTopics: computed('data.event.topic', function() {
    later(this, () => {
      try {
        this.set('subTopic', null);
      } catch (ignored) { /* To suppress error thrown in-case this gets executed after component gets destroy */ }
    }, 50);
    if (!this.get('data.event.topic')) {
      return [];
    }
    return this.get('data.event.topic.subTopics');
  }),

  showDraftButton: computed('data.event.state', function() {
    return this.data.event.state !== 'published';
  }),

  hasPaidTickets: computed('data.event.tickets.[]', function() {
    return filter(this.get('data.event.tickets').toArray(), ticket => ticket.get('type') === 'paid').length > 0;
  }),

  hasDonationTickets: computed('data.event.tickets.@each.type', function() {
    return filter(this.get('data.event.tickets').toArray(), ticket => ticket.get('type') === 'donation').length > 0;
  }),

  hasCodeOfConduct: computed('data.event.codeOfConduct', function() {
    return !!this.get('data.event.codeOfConduct');
  }),

  discountCodeObserver: observer('data.event.discountCode', function() {
    this.getForm().form('remove prompt', 'discount_code');
  }),

  didInsertElement() {
    if (!this.isCreate && this.get('data.event.copyright') && !this.get('data.event.copyright.content')) {
      this.set('data.event.copyright', this.store.createRecord('event-copyright'));
    }
  },

  getValidationRules() {
    let validationRules = {
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
              type   : 'integer[1..]',
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
        }
      }
    };
    // Merging the predetermined rules with the rules for social links.
    validationRules.fields = merge(validationRules.fields, this.socialLinksValidationRules);
    return validationRules;
  },

  actions: {
    connectStripe() {
      this.torii.open('stripe')
        .then(authorization => {
          this.set('data.event.stripeAuthorization', this.store.createRecord('stripe-authorization', {
            stripeAuthCode       : authorization.authorizationCode,
            stripePublishableKey : this.settings.stripePublishableKey
          }));
        })
        .catch(error => {
          this.notify.error(this.l10n.t(`${error.message}. Please try again`));
        });
    },
    async disconnectStripe() {
      let stripeAuthorization = await this.get('data.event.stripeAuthorization');
      stripeAuthorization.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Stripe disconnected successfully'));
        });

    },
    addTicket(type, position) {
      const event = this.get('data.event');
      const salesStartDateTime = moment();
      const salesEndDateTime = this.get('data.event.startsAt');
      this.get('data.event.tickets').pushObject(this.store.createRecord('ticket', {
        event,
        type,
        position,
        salesStartsAt : salesStartDateTime,
        salesEndsAt   : salesEndDateTime
      }));
    },

    updateSalesEndDate(eventStartDate) {
      eventStartDate = moment(new Date(eventStartDate));
      this.get('data.event.tickets').forEach(ticket => {
        if (moment(eventStartDate).isBefore(ticket.get('salesEndsAt'))) {
          ticket.set('salesEndsAt', moment(eventStartDate, 'MM/DD/YYYY').toDate());
        }
      });
    },

    removeTicket(deleteTicket) {
      const index = deleteTicket.get('position');
      this.get('data.event.tickets').forEach(ticket => {
        if (ticket.get('position') > index) {
          ticket.set('position', ticket.get('position') - 1);
        }
      });
      deleteTicket.destroyRecord();
    },

    moveTicket(ticket, direction) {
      const index = ticket.get('position');
      const otherTicket = this.get('data.event.tickets').find(otherTicket => otherTicket.get('position') === (direction === 'up' ? (index - 1) : (index + 1)));
      otherTicket.set('position', index);
      ticket.set('position', direction === 'up' ? (index - 1) : (index + 1));
    },

    openTaxModal(isNewTax) {
      if (!this.isCreate && isNewTax) {
        this.set('data.event.tax', this.store.createRecord('tax'));
      }
      this.set('taxModalIsOpen', true);
    },

    deleteTaxInformation() {
      this.set('data.event.isTaxEnabled', false);
    },

    redeemDiscountCode() {
      this.set('validatingDiscountCode', true);
      // TODO do proper checks. Simulating now.
      later(this, () => {
        if (this.get('data.event.discountCode.code') !== 'AIYPWZQP') {
          this.getForm().form('add prompt', 'discount_code', this.l10n.t('This discount code is invalid. Please try again.'));
        } else {
          this.set('data.event.discountCode.code', 42);
          this.set('discountCodeDescription', 'Tester special discount');
          this.set('discountCodeValue', '25%');
          this.set('discountCodePeriod', '5');
        }
        this.set('validatingDiscountCode', false);
      }, 1000);
    },

    removeDiscountCode() {
      this.setProperties({
        'data.event.discountCode'      : '',
        'data.event.discountCode.code' : null,
        'discountCodeDescription'      : null,
        'discountCodeValue'            : null,
        'discountCodePeriod'           : null
      });
    },

    updateDates() {
      const { startsAtDate, endsAtDate, startsAtTime, endsAtTime, timezone } = this.get('data.event');
      let startsAtConcatenated = moment(startsAtDate.concat(' ', startsAtTime));
      let endsAtConcatenated = moment(endsAtDate.concat(' ', endsAtTime));
      this.get('data.event').setProperties({
        startsAt : moment.tz(startsAtConcatenated, timezone),
        endsAt   : moment.tz(endsAtConcatenated, timezone)
      });
    },

    async updateCopyright(name) {
      const event = this.get('data.event');
      const copyright = await this.getOrCreate(event, 'copyright', 'event-copyright');
      let license = find(licenses, { name });
      copyright.setProperties({
        licence    : name,
        logoUrl    : license.logoUrl,
        licenceUrl : license.link
      });
    }
  }
});
