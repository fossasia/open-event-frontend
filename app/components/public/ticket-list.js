import Component from '@ember/component';
import { computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import { sumBy, merge } from 'lodash-es';
import { A } from '@ember/array';

export default Component.extend(FormMixin, {
  store: service(),

  promotionalCodeApplied: false,

  orderAmount    : null,
  amountOverride : null,

  overridenAmount: computed('orderAmount', 'amountOverride', {
    get() {
      return this.amountOverride ?? this.orderAmount?.total;
    },

    set(key, value) {
      this.set('amountOverride', value);
    }
  }),

  isUnverified: computed('session.isAuthenticated', 'authManager.currentUser.isVerified', function() {
    return this.session.isAuthenticated
      && !this.authManager?.currentUser?.isVerified;
  }),

  shouldDisableOrderButton: computed('hasTicketsInOrder', 'isDonationPriceValid', 'isUnverified', function() {
    if (this.isUnverified) {return true}
    const quantityDonation = sumBy(this.donationTickets.toArray(),
      donationTicket => (donationTicket.orderQuantity || 0));
    if (quantityDonation > 0) {
      return !(this.hasTicketsInOrder && this.isDonationPriceValid);
    } else {
      return !this.hasTicketsInOrder;
    }
  }),

  accessCodeTickets : A(),
  discountedTickets : A(),

  invalidPromotionalCode: false,

  tickets: computed('orderAmount', function() {
    const ticketMap = {};
    if (this.orderAmount) {
      this.orderAmount.tickets.forEach(ticket => {
        ticketMap[ticket.id] = ticket;
      });
    }

    return this.data.sortBy('position').map(ticket => {
      const ticketExtra = ticketMap[ticket.id];

      if (ticketExtra) {
        ticket.set('subTotal', ticketExtra.sub_total);
        ticket.set('discountInfo', ticketExtra.discount);
      }

      return ticket;
    });
  }),

  hasTicketsInOrder: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.tickets.toArray(),
      ticket => (ticket.orderQuantity || 0)
    ) > 0;
  }),

  hasOnlyFreeTickets: computed('tickets.@each.type', function() {
    return !this.tickets.toArray().filter(ticket => ticket.type !== 'free').length > 0;
  }),

  donationTickets: computed.filterBy('data', 'type', 'donation'),

  isDonationPriceValid: computed('donationTickets.@each.orderQuantity', 'donationTickets.@each.price', function() {
    for (const donationTicket of this.donationTickets) {
      if (donationTicket.orderQuantity > 0) {
        if (donationTicket.price < donationTicket.minPrice || donationTicket.price > donationTicket.maxPrice) {
          return false;
        }
      }
    }
    return true;
  }),

  orderAmountInput: computed('tickets.@each.price', 'order.tickets.@each.orderQuantity', 'order.discountCode', function() {
    const input = {
      tickets: this.order.tickets.toArray().map(ticket => ({
        id       : ticket.id,
        quantity : ticket.orderQuantity,
        price    : ticket.price
      })),
      'discount-code': this.order.get('discountCode.id')
    };
    if (this.amountOverride) {
      input.amount = this.amountOverride;
    }
    return input;
  }),

  actions: {
    async togglePromotionalCode(queryParam) {
      this.toggleProperty('enterPromotionalCode');
      if (this.enterPromotionalCode && !queryParam) {
        this.set('promotionalCode', '');
      } else {
        if (queryParam) {
          this.set('promotionalCode', queryParam);
          this.send('applyPromotionalCode');
        } else {
          this.set('promotionalCodeApplied', false);
          this.set('code', null);
          this.order.set('accessCode', undefined);
          this.order.set('discountCode', undefined);
          this.tickets.forEach(ticket => {
            ticket.set('discount', null);
          });
          this.accessCodeTickets.forEach(ticket => {
            ticket.set('isHidden', true);
            this.tickets.removeObject(ticket);
          });
          this.accessCodeTickets.clear();
          this.discountedTickets.clear();
          this.send('updateOrderAmount');
        }

      }
    },
    async applyPromotionalCode() {
      if (!this.code) {
        this.set('code', this.promotionalCode);
      }
      try {
        const accessCode = await this.store.queryRecord('access-code', { eventIdentifier: this.event.id, code: this.promotionalCode });
        this.order.set('accessCode', accessCode);
        const tickets = await accessCode.get('tickets');
        tickets.forEach(ticket => {
          ticket.set('isHidden', false);
          this.tickets.addObject(ticket);
          this.accessCodeTickets.addObject(ticket);
          this.set('invalidPromotionalCode', false);
        });
      } catch (e) {
        console.error('Error while applying access code', e);
        this.set('invalidPromotionalCode', true);
      }
      try {
        const discountCode = await this.store.queryRecord('discount-code', { eventIdentifier: this.event.id, code: this.promotionalCode, include: 'event,tickets' });
        const discountCodeEvent = await discountCode.event;
        if (this.currentEventIdentifier === discountCodeEvent.identifier) {
          this.order.set('discountCode', discountCode);
          const tickets = await discountCode.tickets;
          tickets.forEach(ticket => {
            const discount = discountCode.type === 'amount' ? Math.min(ticket.price, discountCode.value) : ticket.price * (discountCode.value / 100);
            ticket.set('discount', discount);
            this.discountedTickets.addObject(ticket);
            this.set('invalidPromotionalCode', false);
          });
        } else {
          this.set('invalidPromotionalCode', true);
        }
      } catch (e) {
        console.error('Error while applying discount code as promo code', e);
        if (this.invalidPromotionalCode) {
          this.set('invalidPromotionalCode', true);
        }
      }
      if (this.invalidPromotionalCode) {
        this.set('promotionalCodeApplied', false);
        this.notify.error(this.l10n.t('This Promotional Code is not valid'), {
          id: 'prom_inval'
        });
      } else {
        this.set('promotionalCodeApplied', true);
        this.set('promotionalCode', 'Promotional code applied successfully');
      }
      this.send('updateOrderAmount');
    },

    async updateOrder(ticket, count) {
      ticket.set('orderQuantity', count);
      if (count > 0) {
        this.order.tickets.addObject(ticket);
      } else {
        ticket.set('subTotal', null);
        ticket.set('discountInfo', null);
        if (this.order.tickets.includes(ticket)) {
          this.order.tickets.removeObject(ticket);
        }
      }

      this.send('updateOrderAmount');
    },

    async updateOrderAmount() {
      if (this.shouldDisableOrderButton) {
        this.set('orderAmount', null);
        this.set('amountOverride', null);
        return;
      }

      try {
        this.set('orderAmount', await this.loader.post('/orders/calculate-amount', this.orderAmountInput));
        this.order.amount = this.orderAmount.total;
        this.set('amountOverride', null);
      } catch (e) {
        console.error('Error while calculating order amount', e);
        this.notify.error(e.response.errors[0].detail, {
          id: 'order-amount-error'
        });
      }
    },

    handleKeyPress() {
      if (event.code === 'Enter') {
        this.send('applyPromotionalCode');
        this.set('code', this.promotionalCode);
      }
    },

    onChangeDonation() {
      debounce(this, () => this.send('updateOrderAmount'), this.tickets, 250);
    }
  },

  async loadTicketAvailability() {
    try {
      const ticketAvailabilities = await this.loader.load(`/events/${this.event?.get('id')}/tickets/availability`);
      for (const t of ticketAvailabilities) {
        for (const ticket of this.data.toArray()) {
          if (+ticket?.id === t?.id) {
            ticket.set('remaining', t.available);
            ticket.set('maxOrder', Math.min(ticket.get('maxOrder'), t.available));
          }
        }
      }
    } catch (e) {
      console.error('Error while fetching ticket availabilities', e);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.loadTicketAvailability();
    this.data.forEach(ticket => {
      ticket.set('discount', 0);
    });
    if (this.tickets.length === 1) {
      const preSelect = Math.max(this.tickets[0].minOrder, 1);
      this.tickets[0].set('orderQuantity', preSelect);
      this.order.tickets.addObject(this.tickets[0]);
      this.send('updateOrderAmount');
    }
    if (this.code) {
      this.send('togglePromotionalCode', this.code);
    }
  },
  donationTicketsValidation: computed('donationTickets.@each.id', 'donationTickets.@each.minPrice', 'donationTickets.@each.maxPrice', function() {
    const validationRules = {};
    for (const donationTicket of this.donationTickets) {
      validationRules[donationTicket.id] =  {
        identifier : donationTicket.id,
        optional   : true,
        rules      : [
          {
            type   : `integer[${donationTicket.minPrice}..${donationTicket.maxPrice}]`,
            prompt : this.l10n.t('Please enter a donation amount between {{minPrice}} and {{maxPrice}}', {
              minPrice : donationTicket.minPrice,
              maxPrice : donationTicket.maxPrice
            })
          }
        ]
      };
    }
    return validationRules;
  }),
  getValidationRules() {
    const validationRules = {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        promotionalCode: {
          identifier : 'promotionalCode',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the promotional Code')
            }
          ]
        }
      }
    };
    validationRules.fields = merge(validationRules.fields, this.donationTicketsValidation);
    return validationRules;
  }
});
