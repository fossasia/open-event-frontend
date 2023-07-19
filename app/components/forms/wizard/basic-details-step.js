import Component from '@ember/component';
import { later } from '@ember/runloop';
import { observer, computed } from '@ember/object';
import moment from 'moment-timezone';
import { orderBy, filter, find, difference } from 'lodash-es';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';
import { paymentCountries, paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';
import ENV from 'open-event-frontend/config/environment';
import $ from 'jquery';
import { tn } from 'open-event-frontend/utils/text';

export default Component.extend(FormMixin, EventWizardMixin, {

  currentTimezone: moment.tz.guess(),
  timezones,

  torii : service(),
  tn    : service(),

  locationMenuItems: [tn.t('Venue'), tn.t('Online'), tn.t('Hybrid'), tn.t('To be announced')],

  selectedLocationType: 'Venue',

  deletedTickets: [],

  init() {
    this._super(...arguments);
    if (this.data.event.online) {
      if (this.data.event.locationName) {
        this.selectedLocationType = 'Hybrid';
      } else {
        this.selectedLocationType = 'Online';
      }
    } else if (this.data.event.locationName) {
      this.selectedLocationType = 'Venue';
    } else {
      this.selectedLocationType = 'To be announced';
    }
  },

  get paymentModeExists() {
    return this.data.event.canPayByPaypal || this.data.event.canPayByPaytm || this.data.event.canPayByStripe || this.data.event.canPayByCheque || this.data.event.canPayByInvoice || this.data.event.canPayByBank || this.data.event.canPayByOmise || this.data.event.canPayByAlipay || this.data.event.canPayOnsite;
  },

  isLocationRequired: computed('selectedLocationType', function() {
    return ['Venue', 'Hybrid'].includes(this.selectedLocationType);
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
    return this.settings.isPaypalActivated && find(paymentCurrencies, ['code', this.data.event.paymentCurrency]).paypal;
  }),

  canAcceptPaytm: computed('data.event.paymentCurrency', 'settings.isPaytmActivated', function() {
    return this.settings.isPaytmActivated && find(paymentCurrencies, ['code', this.data.event.paymentCurrency]).paytm;
  }),

  canAcceptStripe: computed('data.event.paymentCurrency', 'settings.isStripeActivated', function() {
    return this.settings.isStripeActivated && find(paymentCurrencies, ['code', this.data.event.paymentCurrency]).stripe;
  }),

  canAcceptOmise: computed('data.event.paymentCurrency', 'settings.isOmiseActivated', function() {
    return this.settings.isOmiseActivated && find(paymentCurrencies, ['code', this.data.event.paymentCurrency]).omise;
  }),

  canAcceptAliPay: computed('data.event.paymentCurrency', 'settings.isAlipayActivated', function() {
    return this.settings.isAlipayActivated && find(paymentCurrencies, ['code', this.data.event.paymentCurrency]).alipay;
  }),

  tickets: computed('data.event.tickets.@each.isDeleted', 'data.event.tickets.@each.position', function() {
    return this.data.event.tickets.sortBy('position').filterBy('isDeleted', false);
  }),

  isUserUnverified: computed('authManager.currentUser.isVerified', function() {
    return !this.authManager?.currentUser?.isVerified;
  }),

  subTopics: computed('data.event.topic', function() {
    later(this, () => {
      try {
        this.set('subTopic', null);
      } catch (ignored) {
        /* To suppress error thrown in-case this gets executed after component gets destroy */
        console.warn('Error setting subTopic to null', ignored);
      }
    }, 50);
    if (!this.data.event.topic) {
      return [];
    }

    // TODO(Areeb): Revert to ES6 getter when a solution is found
    return this.data.event.topic.get('subTopics');
  }),

  showDraftButton: computed('data.event.state', function() {
    return this.data.event.state !== 'published';
  }),

  hasPaidTickets: computed('data.event.tickets.@each.type', function() {
    return this.data.event.tickets.toArray().filter(ticket => ticket.type === 'paid' || ticket.type === 'donation' || ticket.type === 'paidRegistration' || ticket.type === 'donationRegistration').length > 0;
  }),

  ticketCount: computed('data.event.tickets.[]', 'deletedTickets.[]', function() {
    return difference(this.data.event.tickets.toArray(), this.deletedTickets).length;
  }),

  timezoneObserver: observer('data.event.timezone', function() {
    const { event } = this.data;
    const { oldTimezone } = this;
    this.oldTimezone = this.data.event.timezone;
    if (!oldTimezone || !this.oldTimezone || oldTimezone === this.oldTimezone) {return}
    if (event.startsAt) {
      event.startsAt = moment.tz(event.startsAt.clone().tz(oldTimezone).format('YYYY-MM-DDTHH:mm:ss.SSS'), moment.ISO_8601, this.data.event.timezone);
    }
    if (event.endsAt) {
      event.endsAt = moment.tz(event.endsAt.clone().tz(oldTimezone).format('YYYY-MM-DDTHH:mm:ss.SSS'), moment.ISO_8601, this.data.event.timezone);
    }
  }),

  discountCodeObserver: observer('data.event.discountCode', function() {
    this.getForm().form('remove prompt', 'discount_code');
  }),

  didInsertElement() {
    if (!this.isCreate && this.data.event.copyright && !this.data.event.copyright.content) {
      this.set('data.event.copyright', this.store.createRecord('event-copyright'));
    }
  },

  // TODO: Removing the Event Time Validations due to the weird and buggy behaviour. Will be restored once a perfect solution is found. Please check issue: https://github.com/fossasia/open-event-frontend/issues/3667
  getValidationRules() {
    $.fn.form.settings.rules.checkMaxMinPrice = () => {
      return parseInt($('.ui.form').form('get value', 'min_price'), 10) <= parseInt($('.ui.form').form('get value', 'max_price'), 10);
    };
    $.fn.form.settings.rules.checkMaxMinOrder = () => {
      return parseInt($('.ui.form').form('get value', 'ticket_min_order'), 10) <= parseInt($('.ui.form').form('get value', 'ticket_max_order'), 10);
    };
    $.fn.form.settings.rules.checkValidTimeDifference = () => {
      return !($('[name=start_date]')[0].value === $('[name=end_date]')[0].value && moment($('[name=start_time]')[0].value, 'HH:mm').isSameOrAfter(moment($('[name=end_time]')[0].value, 'HH:mm')));
    };
    $.fn.form.settings.rules.checkDateDifference = () => {
      return moment($('[name=end_date]')[0].value, 'MM-DD-YYYY').diff(moment($('[name=start_date]')[0].value, 'MM-DD-YYYY'), 'days') <= 20;
    };

    const validationRules = {
      inline : true,
      delay  : false,
      on     : 'change',
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
              prompt : this.l10n.t('Choose a timezone for your event.')
            }
          ]
        },
        startDate: {
          identifier : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('When does your event start?')
            },
            {
              type   : 'date',
              prompt : this.l10n.t('Please enter a valid start date.')
            }
          ]
        },
        endDate: {
          identifier : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('When does your event end?')
            },
            {
              type   : 'date',
              prompt : this.l10n.t('Please enter a valid end date.')
            },
            {
              type   : 'checkDateDifference',
              prompt : this.l10n.t('Event duration can not be more than 20 days.')
            }
          ]
        },
        startTime: {
          identifier : 'start_time',
          depends    : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a start time.')
            },
            {
              type   : 'checkValidTimeDifference',
              prompt : this.l10n.t('The start time should be before the end time!')
            }
          ]
        },
        endTime: {
          identifier : 'end_time',
          depends    : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter an end time.')
            },
            {
              type   : 'checkValidTimeDifference',
              prompt : this.l10n.t('The end time should be after the start time!')
            }
          ]
        },
        ticketName: {
          identifier : 'ticket_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give your ticket a name.')
            }
          ]
        },
        ticketDescription: {
          identifier : 'ticket_description',
          optional   : true,
          rules      : [
            {
              type   : 'maxLength[160]',
              prompt : this.l10n.t('Ticket description shouldn\'t contain more than {ruleValue} characters.')
            }
          ]
        },
        ticketPrice: {
          identifier : 'ticket_price',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give your ticket a price.')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Please give a proper price for you ticket.')
            },
            {
              type   : 'decimal[0..]',
              prompt : this.l10n.t('Ticket price should be greater than 0.')
            }
          ]
        },
        ticketQuantity: {
          identifier : 'ticket_quantity',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please specify how many tickets of this type are available.')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Please give a proper quantity for your ticket.')
            }
          ]
        },
        ticketMinOrder: {
          identifier : 'ticket_min_order',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Minimum tickets per order required.')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Invalid number!')
            },
            {
              type   : 'checkMaxMinOrder',
              prompt : this.l10n.t('Minimum order should not be greater than maximum.')
            }
          ]
        },
        ticketMaxOrder: {
          identifier : 'ticket_max_order',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Maximum tickets per order required.')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Invalid number!')
            },
            {
              type   : 'integer[1..]',
              prompt : this.l10n.t('Maximum tickets per order should be greater than 0.')
            },
            {
              type   : 'checkMaxMinOrder',
              prompt : this.l10n.t('Maximum order should not be less than minimum.')
            }
          ]
        },
        minPrice: {
          identifier : 'min_price',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Minimum price for donation tickets required.')
            },
            {
              type   : 'integer[1..]',
              prompt : this.l10n.t('Minimum price needs to be greater than zero.')
            },
            {
              type   : 'checkMaxMinPrice',
              prompt : this.l10n.t('Minimum price should not be greater than maximum.')
            }
          ]
        },
        maxPrice: {
          identifier : 'max_price',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Maximum price for donation tickets required.')
            },
            {
              type   : 'integer[1..]',
              prompt : this.l10n.t('Maximum price needs to be greater than zero.')
            },
            {
              type   : 'checkMaxMinPrice',
              prompt : this.l10n.t('Maximum price should not be less than minimum.')
            }
          ]
        },
        paypalEmail: {
          identifier : 'paypal_email',
          rules      : [
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address.')
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
        invoiceDetails: {
          identifier : 'invoice_details',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please fill the invoice details for payment of tickets.')
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
              prompt : this.l10n.t('Please enter a valid URL.')
            }
          ]
        },
        paymentCountry: {
          identifier : 'payment_country',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select your country.')
            }
          ]
        }
      }
    };
    // Merging the predetermined rules with the rules for social links.
    return validationRules;
  },

  actions: {
    onStripeCheckboxChange() {
      this.data.event.canPayByStripe = !this.data.event.canPayByStripe;
      this.data.event.isBillingInfoMandatory = this.data.event.canPayByStripe;
    },
    connectStripe() {
      this.torii.open('stripe')
        .then(authorization => {
          this.set('data.event.stripeAuthorization', this.store.createRecord('stripe-authorization', {
            stripeAuthCode       : authorization.authorizationCode,
            stripePublishableKey : ENV.environment === 'development' || ENV.environment === 'test' ? this.settings.stripeTestPublishableKey : this.settings.stripePublishableKey
          }));
        })
        .catch(error => {
          console.error('Error while setting stripe authorization in event', error);
          this.notify.error(error.message + '. ' + this.l10n.t('Please try again.'), {
            id: 'basic_detail_err'
          });
        });
    },
    async disconnectStripe() {
      const stripeAuthorization = await this.data.event.stripeAuthorization;
      stripeAuthorization.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Stripe disconnected successfully.'), {
            id: 'stripe_disconn'
          });
        });
    },

    async addTicket(type, position) {
      const { event } = this.data;
      const salesStartDateTime = moment();
      const salesEndDateTime = this.data.event.endsAt;
      if (type === 'registration') {
        if (this.data.event.isOneclickSignupEnabled) {
          this.data.event.isOneclickSignupEnabled = false;
          return;
        }
        try {
          await this.confirm.prompt(this.l10n.t('If you choose this option other ticket options will not be available. Do you want to proceed?'));
          this.data.event.isOneclickSignupEnabled = true;
          let countRegistration = 0;
          this.data.event.tickets?.toArray().filter(x => {
            if (x.type === 'registration') {
              countRegistration += 1;
            }
          });
          if (countRegistration > 0) {
            return;
          }
        } catch (e) {
          this.data.event.isOneclickSignupEnabled = false;
        }
      }
      this.data.event.tickets.pushObject(this.store.createRecord('ticket', {
        name          : type === 'registration' ? 'registration' : '',
        event,
        type,
        position,
        quantity      : 100,
        maxPrice      : type === 'donation' ? 10000 : null,
        salesStartsAt : salesStartDateTime,
        salesEndsAt   : type === 'registration' ? this.data.event.endsAt : salesEndDateTime
      }));
    },

    updateSalesEndDate(eventStartDate) {
      eventStartDate = moment(new Date(eventStartDate));
      this.data.event.tickets.forEach(ticket => {
        if (moment(eventStartDate).isBefore(ticket.get('salesEndsAt'))) {
          ticket.set('salesEndsAt', moment(eventStartDate, 'MM/DD/YYYY').toDate());
        }
      });
    },

    removeTicket(deleteTicket) {
      const index = deleteTicket.get('position');
      this.data.event.tickets.forEach(ticket => {
        if (!ticket.isDeleted && ticket.get('position') > index) {
          ticket.set('position', ticket.get('position') - 1);
        }
      });
      this.set('deletedTickets', [...this.deletedTickets, deleteTicket]);
      deleteTicket.deleteRecord();
    },

    moveTicket(ticket, index, direction) {
      const otherTicket = this.data.event.tickets.find(otherTicket => otherTicket.get('position') === (direction === 'up' ? (index - 1) : (index + 1)));
      otherTicket.set('position', index);
      ticket.set('position', direction === 'up' ? (index - 1) : (index + 1));
    },

    async openTaxModal() {
      let tax = await this.getOrCreateTax(this.data.event, 'tax', 'tax');
      if (tax && !tax.get('name')) {
        tax.isTaxIncludedInPrice = true;
        tax.save();
      } else {
        tax = this.store.createRecord('tax');
      }
      // Note(Areeb): Workaround for issue #4385, ember data always fetches
      // event.tax from network if it is not already created for some reason
      this.set('data.tax', tax);
      this.set('data.event.tax', tax);
      this.set('taxModalIsOpen', true);
    },

    deleteTaxInformation() {
      this.set('data.event.isTaxEnabled', false);
    },

    redeemDiscountCode() {
      this.set('validatingDiscountCode', true);
      // TODO do proper checks. Simulating now.
      later(this, () => {
        if (this.data.event.discountCode.code !== 'AIYPWZQP') {
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

    // leaving these comments.. because someday we might want the time validation to change it's values according to its start counterpart, removed it for now because it sort of broke the UI.
    // updateDates() {
    //   const { startsAtDate, endsAtDate, startsAtTime, endsAtTime, timezone } = this.get('data.event');
    //   let startsAtConcatenated = moment(startsAtDate.concat(' ', startsAtTime));
    //   let endsAtConcatenated = moment(endsAtDate.concat(' ', endsAtTime));
    //   this.get('data.event').setProperties({
    //     startsAt : moment.tz(startsAtConcatenated, timezone),
    //     endsAt   : moment.tz(endsAtConcatenated, timezone)
    //   });
    // },

    onChange() {
      this.onValid(() => {});
    }
  },

  async getOrCreateTax(event) {
    try {
      return await event.get('tax');
    } catch {
      return this.store.createRecord('tax', {
        event,
        isTaxIncludedInPrice: true
      });
    }
  }

});
