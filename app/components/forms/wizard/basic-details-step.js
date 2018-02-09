import Ember from 'ember';
import moment from 'moment';
import { licenses } from 'open-event-frontend/utils/dictionary/licenses';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';
import { paymentCountries, paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import FormMixin from 'open-event-frontend/mixins/form';
import { orderBy, filter, find } from 'lodash';

const { Component, computed, run: { later }, observer } = Ember;

export default Component.extend(FormMixin, {

  currentTimezone: moment.tz.guess(),

  getValidationRules() {
    return {
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
            }
          ]
        }
      }
    };
  },

  timezones: computed(function() {
    return timezones;
  }),

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

  canAcceptPayPal: computed('data.event.paymentCurrency', function() {
    return find(paymentCurrencies, ['code', this.get('data.event.paymentCurrency')]).paypal;
  }),

  canAcceptStripe: computed('data.event.paymentCurrency', function() {
    return find(paymentCurrencies, ['code', this.get('data.event.paymentCurrency')]).stripe;
  }),

  tickets: computed('data.event.tickets.@each.isDeleted', 'data.event.tickets.@each.position', function() {
    return this.get('data.event.tickets').sortBy('position').filterBy('isDeleted', false);
  }),

  socialLinks: computed('data.event.socialLinks.@each.isDeleted', function() {
    return this.get('data.event.socialLinks').filterBy('isDeleted', false);
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

  hasPaidTickets: computed('data.event.tickets.[]', function() {
    return filter(this.get('data.event.tickets').toArray(), ticket => ticket.get('type') === 'paid').length > 0;
  }),

  hasCodeOfConduct: computed('data.event.codeOfConduct', function() {
    return this.get('data.event.codeOfConduct') ? true : false;
  }),

  discountCodeObserver: observer('data.event.discountCode', function() {
    this.getForm().form('remove prompt', 'discount_code');
  }),
  actions: {
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save');
      });
    },
    moveForward() {
      this.onValid(() => {
        this.sendAction('move');
      });
    },
    publish() {
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.sendAction('save');
      });
    },
    addTicket(type, position) {
      const salesStartDateTime = moment();
      const salesEndDateTime = this.get('data.event.startsAt');
      this.get('data.event.tickets').pushObject(this.store.createRecord('ticket', {
        type,
        position,
        salesStartsAt : salesStartDateTime,
        salesEndsAt   : salesEndDateTime
      }));
    },
    removeTicket(deleteTicket) {
      const index = deleteTicket.get('position');
      this.get('data.event.tickets').forEach(ticket => {
        if (ticket.get('position') > index) {
          ticket.set('position', ticket.get('position') - 1);
        }
      });
      deleteTicket.deleteRecord();
    },
    moveTicket(ticket, direction) {
      const index = ticket.get('position');
      const otherTicket = this.get('data.event.tickets').find(otherTicket => otherTicket.get('position') === (direction === 'up' ? (index - 1) : (index + 1)));
      otherTicket.set('position', index);
      ticket.set('position', direction === 'up' ? (index - 1) : (index + 1));
    },
    addItem(type, model) {
      this.get(`data.event.${type}`).pushObject(this.store.createRecord(model));
    },
    removeItem(item) {
      item.deleteRecord();
    },
    openTaxModal() {
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
      const timezone = this.get('data.event.timezone');
      var startDate = this.get('data.event.startsAt');
      var endDate = this.get('data.event.endsAt');
      this.set('data.event.startsAt', moment.tz(startDate, timezone));
      this.set('data.event.endsAt', moment.tz(endDate, timezone));
    },
    updateCopyright() {
      let license = find(licenses, { name: this.get('data.event.copyright.licence') });
      this.set('data.event.copyright.logoUrl', license.logoUrl);
      this.set('data.event.copyright.licenceUrl', license.link);
    }
  },
  didInsertElement() {
    if (!this.get('isCreate') && this.get('data.event.copyright') && !this.get('data.event.copyright.content')) {
      this.set('data.event.copyright', this.store.createRecord('event-copyright'));
    }
    if (!this.get('isCreate') && this.get('data.event.tax') && !this.get('data.event.tax.content')) {
      this.set('data.event.tax', this.store.createRecord('tax'));
    }
  }
});
