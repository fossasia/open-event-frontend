import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { later } from '@ember/runloop';
import { currencySymbol } from 'open-event-frontend/helpers/currency-symbol';
export default Component.extend(FormMixin, {
  getValidationRules() {
    window.$.fn.form.settings.rules.checkMaxMin = () => {
      return this.data.minQuantity <= this.data.maxQuantity;
    };
    window.$.fn.form.settings.rules.checkMaxTotal = () => {
      return this.data.maxQuantity <= this.data.ticketsNumber;
    };
    window.$.fn.form.settings.rules.checkTicketSelected = () => {
      const tickets = this.eventTickets;
      for (const ticket of tickets) {
        if (ticket.isChecked) {
          return true;
        }
      }
      return false;
    };

    // TODO: Removing the Discount Code Time Validations due to the weird and buggy behaviour. Will be restored once a perfect solution is found. Please check issue: https://github.com/fossasia/open-event-frontend/issues/3667
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
              prompt : this.l10n.t('Please enter a discount code')
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
              prompt : this.l10n.t('Please enter the number of tickets')
            }
          ]
        },
        discountAmount: {
          identifier : 'discount_amount',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the discount amount')
            }
          ]
        },
        discountPercent: {
          identifier : 'discount_percent',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the discount percentage')
            }
          ]
        },
        minOrder: {
          identifier : 'min_order',
          optional   : true,
          rules      : [
            {
              type   : 'integer',
              prompt : this.l10n.t('Please enter a valid integer')
            },
            {
              type   : 'checkMaxMin',
              prompt : this.l10n.t('Minimum value should not be greater than maximum')
            }
          ]
        },
        maxOrder: {
          identifier : 'max_order',
          optional   : true,
          rules      : [
            {
              type   : 'integer',
              prompt : this.l10n.t('Please enter a valid integer')
            },
            {
              type   : 'checkMaxMin',
              prompt : this.l10n.t('Maximum value should not be less than minimum')
            },
            {
              type   : 'checkMaxTotal',
              prompt : this.l10n.t('Maximum value should not be greater than number of tickets')
            }
          ]
        },
        ticketName: {
          identifier : 'ticket_name',
          rules      : [
            {
              type   : 'checkTicketSelected',
              prompt : this.l10n.t('Please select at least 1 ticket.')
            }
          ]
        }
      }
    };
  },
  discountLink: computed('data.code', function() {
    const { params } = this.router._router.currentState.routerJsState;
    const origin = this.fastboot.isFastBoot ? `${this.fastboot.request.protocol}//${this.fastboot.request.host}` : location.origin;
    const link = origin + this.router.urlFor('public', params['events.view'].event_id, { queryParams: { code: this.data.code } });
    this.set('data.discountUrl', link);
    return link;
  }),

  amountLabel: computed('event.paymentCurrency', function() {
    return `Amount (${currencySymbol([this.event.paymentCurrency])})`;
  }),

  eventTickets: computed('tickets', function() {
    return this.tickets.filter(ticket => ticket.type === 'paidRegistration' || ticket.type === 'paid');
  }),

  allTicketTypesChecked: computed('tickets', function() {
    if (this.eventTickets.length && this.data.tickets.length === this.eventTickets.length) {
      return true;
    }
    return false;
  }),

  isLinkSuccess: false,

  actions: {
    toggleAllSelection(allTicketTypesChecked) {
      this.toggleProperty('allTicketTypesChecked');
      const tickets = this.eventTickets;
      if (allTicketTypesChecked) {
        this.set('data.tickets', tickets.slice());
      } else {
        this.data.tickets.clear();
      }
      tickets.forEach(ticket => {
        ticket.set('isChecked', allTicketTypesChecked);
      });
    },
    updateTicketsSelection(ticket) {
      if (!ticket.get('isChecked')) {
        this.data.tickets.pushObject(ticket);
        ticket.set('isChecked', true);
        if (this.data.tickets.length === this.eventTickets.length) {
          this.set('allTicketTypesChecked', true);
        }
      } else {
        this.data.tickets.removeObject(ticket);
        ticket.set('isChecked', false);
        this.set('allTicketTypesChecked', false);
      }
    },
    submit(data) {
      this.onValid(() => {
        this.sendAction('save', data);
      });
    },
    copiedText() {
      this.set('isLinkSuccess', true);
      later(this, () => {
        this.set('isLinkSuccess', false);
      }, 5000);
    },
    onChange() {
      this.onValid(() => {});
    }
  }
});
