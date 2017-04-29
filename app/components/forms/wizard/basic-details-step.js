import Ember from 'ember';
import moment from 'moment';
import { licenses } from 'open-event-frontend/utils/dictionary/licenses';
import { FORM_DATE_FORMAT, timezones } from 'open-event-frontend/utils/dictionary/date-time';
import { paymentCountries, paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';
import { eventTopics, eventTypes } from 'open-event-frontend/utils/dictionary/event';
import FormMixin from 'open-event-frontend/mixins/form';
import { orderBy, filter, keys, find, values } from 'lodash';

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
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please give your event a name')
            }
          ]
        },
        timezone: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Choose a timezone for your event')
            }
          ]
        },
        start_date: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please tell us when your event starts')
            },
            {
              type   : 'date',
              prompt : this.i18n.t('Please give a valid start date')
            }
          ]
        },
        end_date: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please tell us when your event ends')
            },
            {
              type   : 'date',
              prompt : this.i18n.t('Please give a valid end date')
            }
          ]
        },
        start_time: {
          depends : 'start_date',
          rules   : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please give a start time')
            }
          ]
        },
        end_time: {
          depends : 'end_date',
          rules   : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please give an end time')
            }
          ]
        },
        ticket_name: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please give your ticket a name')
            }
          ]
        },
        ticket_description: {
          optional : true,
          rules    : [
            {
              type   : 'maxLength[160]',
              prompt : this.i18n.t('Ticket description shouldn\'t contain more than {ruleValue} characters')
            }
          ]
        },
        ticket_price: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please give your ticket a price')
            },
            {
              type   : 'number',
              prompt : this.i18n.t('Please give a proper price for you ticket')
            }
          ]
        },
        ticket_quantity: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please specify how many tickets of this type are available')
            },
            {
              type   : 'number',
              prompt : this.i18n.t('Please give a proper quantity for you ticket')
            }
          ]
        },
        ticket_min_order: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Minimum tickets per order required')
            },
            {
              type   : 'number',
              prompt : this.i18n.t('Invalid number')
            }
          ]
        },
        ticket_max_order: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Maximum tickets per order required')
            },
            {
              type   : 'number',
              prompt : this.i18n.t('Invalid number')
            }
          ]
        }
      }
    };
  },

  segmentedExternalTicketUrl: computed('data.event.externalTicketUrl', {
    get() {
      const splitted = this.get('data.event.externalTicketUrl') ? this.get('data.event.externalTicketUrl').split('://') : [];
      if (!splitted || splitted.length === 0 || (splitted.length === 1 && splitted[0].includes('http'))) {
        return {
          protocol : 'https',
          address  : ''
        };
      }
      return {
        protocol : splitted[0],
        address  : splitted[1]
      };
    },
    set(key, value) {
      this.set('data.event.externalTicketUrl', values(value).join('://'));
      return value;
    }
  }),

  timezones: computed(function() {
    return timezones;
  }),

  licenses: computed(function() {
    return orderBy(licenses, 'name');
  }),

  types: computed(function() {
    return orderBy(eventTypes);
  }),

  paymentCountries: computed(function() {
    return orderBy(paymentCountries, 'name');
  }),

  paymentCurrencies: computed(function() {
    return orderBy(paymentCurrencies, 'name');
  }),

  topics: computed(function() {
    return orderBy(keys(eventTopics));
  }),

  canAcceptPayPal: computed('data.event.paymentCurrency', function() {
    return find(paymentCurrencies, ['code', this.get('data.event.paymentCurrency')]).paypal;
  }),

  canAcceptStripe: computed('data.event.paymentCurrency', function() {
    return find(paymentCurrencies, ['code', this.get('data.event.paymentCurrency')]).stripe;
  }),

  subTopics: computed('data.event.topic', function() {
    later(this, () => {
      this.set('data.event.subTopic', null);
    }, 50);
    if (!this.get('data.event.topic')) {
      return [];
    }
    return orderBy(eventTopics[this.get('data.event.topic')]);
  }),

  hasPaidTickets: computed('data.event.tickets.[]', function() {
    return filter(this.get('data.event.tickets'), ticket => ticket.get('type') === 'paid').length > 0;
  }),

  discountCodeObserver: observer('data.event.discountCode', function() {
    this.getForm().form('remove prompt', 'discount_code');
  }),

  actions: {
    saveDraft() {
      this.onValid(() => {
        this.get('save')('draft');
      });
    },
    moveForward() {
      this.onValid(() => {
        this.get('move')();
      });
    },
    publish() {
      this.onValid(() => {
        this.get('save')('publish');
      });
    },
    addTicket(type) {
      const salesStartDateTime = moment(this.get('data.event.startDate'), FORM_DATE_FORMAT).subtract(1, 'months');
      const salesEndDateTime = salesStartDateTime.clone().add(10, 'days');
      this.get('data.event.tickets').pushObject(this.store.createRecord('ticket', {
        type,
        salesStartDateTime : salesStartDateTime.toDate(),
        salesEndDateTime   : salesEndDateTime.toDate()
      }));
    },
    removeTicket(ticket) {
      ticket.unloadRecord();
      this.get('data.event.tickets').removeObject(ticket);
    },
    moveTicket(ticket, direction) {
      const index = this.get('data.event.tickets').indexOf(ticket);
      this.get('data.event.tickets').removeAt(index);
      this.get('data.event.tickets').insertAt(direction === 'up' ? (index - 1) : (index + 1), ticket);
    },
    addItem(type, model) {
      this.get(`data.event.${type}`).pushObject(this.store.createRecord(model));
    },
    removeItem(item, type) {
      item.unloadRecord();
      this.get(`data.event.${type}`).removeObject(item);
    },
    openTaxModal() {
      this.set('taxModelIsOpen', true);
    },
    deleteTaxInformation() {
      this.set('data.event.hasTaxInfo', false);
      this.get('data.event.taxInfo').unloadRecord();
      this.set('data.event.taxInfo', this.store.createRecord('tax-info'));
    },
    redeemDiscountCode() {
      this.set('validatingDiscountCode', true);
      // TODO do proper checks. Simulating now.
      later(this, () => {
        if (this.get('data.event.discountCode') !== 'AIYPWZQP') {
          this.getForm().form('add prompt', 'discount_code', this.i18n.t('This discount code is invalid. Please try again.'));
        } else {
          this.set('data.event.discountCodeId', 42);
          this.set('discountCodeDescription', 'Tester special discount');
          this.set('discountCodeValue', '25%');
          this.set('discountCodePeriod', '5');
        }
        this.set('validatingDiscountCode', false);
      }, 1000);
    },
    removeDiscountCode() {
      this.setProperties({
        'data.event.discountCode'   : '',
        'data.event.discountCodeId' : null,
        'discountCodeDescription'   : null,
        'discountCodeValue'         : null,
        'discountCodePeriod'        : null
      });
    }
  }
});
