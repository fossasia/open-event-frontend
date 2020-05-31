import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import { sumBy, merge } from 'lodash-es';
import { A } from '@ember/array';

export default Component.extend(FormMixin, {
  store: service(),

  promotionalCodeApplied: false,

  orderAmount: null,

  isUnverified: computed('session.isAuthenticated', 'authManager.currentUser.isVerified', function() {
    return this.session.isAuthenticated
      && !this.authManager.currentUser.isVerified;
  }),

  shouldDisableOrderButton: computed('hasTicketsInOrder', 'isDonationPriceValid', function() {
    let quantityDonation = sumBy(this.donationTickets.toArray(),
      donationTicket => (donationTicket.orderQuantity || 0));
    if (quantityDonation > 0) {
      return !(this.hasTicketsInOrder && this.isDonationPriceValid);
    } else {
      return !this.hasTicketsInOrder;
    }
  }),

  showTaxIncludedMessage: computed('taxInfo.isTaxIncludedInPrice', function() {
    if (this.taxInfo !== null) {
      return (this.taxInfo.isTaxIncludedInPrice);
    }
    return false;
  }),

  accessCodeTickets : A(),
  discountedTickets : A(),

  invalidPromotionalCode: false,

  tickets: computed(function() {
    return this.data.sortBy('position');
  }),
  hasTicketsInOrder: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.tickets.toArray(),
      ticket => (ticket.orderQuantity || 0)
    ) > 0;
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

  total: computed('tickets.@each.price', 'tickets.@each.orderQuantity', 'tickets.@each.discount', function() {
    if (this.taxInfo !== null) {
      return sumBy(this.tickets.toArray(),
        ticket => ((ticket.ticketPriceWithTax || 0) - (ticket.discount || 0)) * (ticket.orderQuantity || 0)
      );
    }
    return sumBy(this.tickets.toArray(),
      ticket => ((ticket.price || 0) - (ticket.discount || 0)) * (ticket.orderQuantity || 0)
    );
  }),

  orderAmountInput: computed('order.tickets.@each.orderQuantity', 'order.discountCode', function() {
    console.log(this.order.tickets.toArray());

    return {
      tickets: this.order.tickets.toArray().map(ticket => ({
        id       : ticket.id,
        quantity : ticket.orderQuantity,
        price    : ticket.price
      })),
      'discount-code': this.order.get('discountCode.id')
    };
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
          this.accessCodeTickets.forEach(ticket => {
            ticket.set('isHidden', true);
            this.tickets.removeObject(ticket);
          });
          this.discountedTickets.forEach(ticket => {
            let taxRate = ticket.get('event.tax.rate');
            ticket.set('discount', 0);
          });
          this.accessCodeTickets.clear();
          this.discountedTickets.clear();
        }

      }
    },
    async applyPromotionalCode() {
      if (!this.code) {
        this.set('code', this.promotionalCode);
      }
      try {
        let accessCode = await this.store.queryRecord('access-code', { eventIdentifier: this.event.id, code: this.promotionalCode });
        this.order.set('accessCode', accessCode);
        let tickets = await accessCode.get('tickets');
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
          const discountType = discountCode.type;
          const discountValue = discountCode.value;
          this.order.set('discountCode', discountCode);
          const tickets = await discountCode.tickets;
          tickets.forEach(ticket => {
            const ticketPrice = ticket.price;
            const discount = discountType === 'amount' ? Math.min(ticketPrice, discountValue) : ticketPrice * (discountValue / 100);
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
        this.notify.error('This Promotional Code is not valid', {
          id: 'prom_inval'
        });
      } else {
        this.set('promotionalCodeApplied', true);
        this.set('promotionalCode', 'Promotional code applied successfully');
      }
      this.order.set('amount', this.total);

    },
    async updateOrder(ticket, count) {
      ticket.set('orderQuantity', count);
      this.order.set('amount', this.total);
      if (!this.total) {
        this.order.set('amount', 0);
      }
      if (count > 0) {
        this.order.tickets.addObject(ticket);
      } else {
        if (this.order.tickets.includes(ticket)) {
          this.order.tickets.removeObject(ticket);
        }
      }
      console.log(this.orderAmountInput);
      this.orderAmount = await this.loader.post('/orders/calculate-amount', this.orderAmountInput);
      console.log(this.orderAmount);
    },

    handleKeyPress() {
      if (event.code === 'Enter') {
        this.send('applyPromotionalCode');
        this.set('code', this.promotionalCode);
      }
    }
  },
  didInsertElement() {
    this.data.forEach(ticket => {
      ticket.set('discount', 0);
    });
    if (this.code) {
      this.send('togglePromotionalCode', this.code);
    }
  },
  donationTicketsValidation: computed('donationTickets.@each.id', 'donationTickets.@each.minPrice', 'donationTickets.@each.maxPrice', function() {
    const validationRules = {};
    for (let donationTicket of this.donationTickets) {
      validationRules[donationTicket.id] =  {
        identifier : donationTicket.id,
        optional   : true,
        rules      : [
          {
            type   : `integer[${donationTicket.minPrice}..${donationTicket.maxPrice}]`,
            prompt : this.l10n.t(`Please enter a donation amount between ${donationTicket.minPrice} and ${donationTicket.maxPrice}`)
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
