import Ember from 'ember';
import moment from 'moment';
import { licenses, timezones } from 'open-event-frontend/utils/dictionary';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizard from 'open-event-frontend/mixins/event-wizard';
import { orderBy, filter } from 'lodash';

const { Component, computed, on } = Ember;

export default Component.extend(FormMixin, EventWizard, {

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
              prompt : 'Please give your event a name'
            }
          ]
        },
        start_date: {
          rules: [
            {
              type   : 'empty',
              prompt : 'Please tell us when your event starts'
            },
            {
              type   : 'date',
              prompt : 'Please give a valid start date'
            }
          ]
        },
        end_date: {
          rules: [
            {
              type   : 'empty',
              prompt : 'Please tell us when your event ends'
            },
            {
              type   : 'date',
              prompt : 'Please give a valid end date'
            }
          ]
        },
        start_time: {
          depends : 'start_date',
          rules   : [
            {
              type   : 'empty',
              prompt : 'Please give a start time'
            }
          ]
        },
        end_time: {
          depends : 'end_date',
          rules   : [
            {
              type   : 'empty',
              prompt : 'Please give an end time'
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

  hasPaidTickets: computed('data.tickets.[]', function() {
    return filter(this.get('data.tickets'), ticket => ticket.get('type') === 'paid').length > 0;
  }),

  actions: {
    saveDraft() {
      this.$('form').form('validate form');
    },
    moveForward() {
      this.$('form').form('validate form');
    },
    addTicket(type) {
      this.get('data.tickets').pushObject(this.store.createRecord('ticket', { type }));
    },
    removeTicket(ticket) {
      ticket.unloadRecord();
      this.get('data.tickets').removeObject(ticket);
    },
    addItem(type, model) {
      this.get(`data.${type}`).pushObject(this.store.createRecord(model));
    },
    removeItem(item, type) {
      item.unloadRecord();
      this.get(`data.${type}`).removeObject(item);
    },
    openTaxModal() {
      this.set('taxModelIsOpen', true);
    },
    deleteTaxInformation() {
      console.log('deleteTaxInformation');
      this.set('data.hasTaxInfo', false);
      this.get('data.taxInfo').unloadRecord();
      this.set('data.taxInfo', this.store.createRecord('tax-info'));
    }
  },

  _init: on('init', function() {
    this.set('data', this.getBasicDetails());
  })
});
