import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  getValidationRules() {
    $.fn.form.settings.rules.checkMaxMin = () => {
      return this.get('data.minQuantity') <= this.get('data.maxQuantity');
    };
    $.fn.form.settings.rules.checkMaxTotal = () => {
      return this.get('data.maxQuantity') <= this.get('data.ticketsNumber');
    };
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        discountCode: {
          identifier : 'discount_code',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a discount code')
            },
            {
              type  : 'regExp',
              value : '^[a-zA-Z0-9_-]*$'
            }
          ]
        },
        numberOfdiscountTickets: {
          identifier : 'number_of_discount_tickets',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the number of tickets')
            }
          ]
        },
        discountAmount: {
          identifier : 'discount_amount',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the discount amount')
            }
          ]
        },
        discountPercent: {
          identifier : 'discount_percent',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the discount percentage')
            }
          ]
        },
        minOrder: {
          identifier : 'min_order',
          optional   : true,
          rules      : [
            {
              type   : 'integer',
              prompt : this.get('l10n').t('Please enter a valid integer')
            },
            {
              type   : 'checkMaxMin',
              prompt : this.get('l10n').t('Minimum value should not be greater than maximum')
            }
          ]
        },
        maxOrder: {
          identifier : 'max_order',
          optional   : true,
          rules      : [
            {
              type   : 'integer',
              prompt : this.get('l10n').t('Please enter a valid integer')
            },
            {
              type   : 'checkMaxMin',
              prompt : this.get('l10n').t('Maximum value should not be less than minimum')
            },
            {
              type   : 'checkMaxTotal',
              prompt : this.get('l10n').t('Maximum value should not be greater than number of tickets')
            }
          ]
        }
      }
    };
  },
  discountLink: computed('data.code', function() {
    const params = this.get('router._router.currentState.routerJsState.params');
    const origin = this.get('fastboot.isFastBoot') ? `${this.get('fastboot.request.protocol')}//${this.get('fastboot.request.host')}` : location.origin;
    let link = origin + this.get('router').urlFor('public', params['events.view'].event_id, { queryParams: { discount_code: this.get('data.code') } });
    this.set('data.discountUrl', link);
    return link;
  }),
  eventTickets: computed.filterBy('tickets', 'type', 'paid'),

  allTicketTypesChecked: computed('tickets', function() {
    if (this.eventTickets.length && this.get('data.tickets').length === this.eventTickets.length) {
      return true;
    }
    return false;
  }),

  actions: {
    toggleAllSelection(allTicketTypesChecked) {
      this.toggleProperty('allTicketTypesChecked');
      let tickets = this.eventTickets;
      if (allTicketTypesChecked) {
        this.set('data.tickets', tickets.slice());
      } else {
        this.get('data.tickets').clear();
      }
      tickets.forEach(ticket => {
        ticket.set('isChecked', allTicketTypesChecked);
      });
    },
    updateTicketsSelection(ticket) {
      if (!ticket.get('isChecked')) {
        this.get('data.tickets').pushObject(ticket);
        ticket.set('isChecked', true);
        if (this.get('data.tickets').length === this.eventTickets.length) {
          this.set('allTicketTypesChecked', true);
        }
      } else {
        this.get('data.tickets').removeObject(ticket);
        ticket.set('isChecked', false);
        this.set('allTicketTypesChecked', false);
      }
    },
    submit(data) {
      this.onValid(() => {
        this.sendAction('save', data);
      });
    }
  }
});
