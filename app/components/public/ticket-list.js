import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import { sumBy } from 'lodash-es';
import { A } from '@ember/array';
import { merge } from 'lodash-es';

export default Component.extend(FormMixin, {
  store: service(),

  promotionalCodeApplied: false,

  isUnverified: computed('session.isAuthenticated', 'authManager.currentUser.isVerified', function() {
    return this.get('session.isAuthenticated')
      && !this.get('authManager.currentUser.isVerified');
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
            let ticketPrice = ticket.get('price');
            if (taxRate && !this.showTaxIncludedMessage) {
              let ticketPriceWithTax = ticketPrice * (1 + taxRate / 100);
              ticket.set('ticketPriceWithTax', ticketPriceWithTax);
            } else if (taxRate && this.showTaxIncludedMessage) {
              let includedTaxAmount = (taxRate * ticketPrice) / (100 + taxRate);
              ticket.set('includedTaxAmount', includedTaxAmount);
            }
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
        this.set('invalidPromotionalCode', true);
      }
      try {
        let discountCode = await this.store.queryRecord('discount-code', { eventIdentifier: this.event.id, code: this.promotionalCode });
        let discountCodeEvent = await discountCode.get('event');
        if (this.currentEventIdentifier === discountCodeEvent.identifier) {
          let discountType = discountCode.get('type');
          let discountValue = discountCode.get('value');
          this.order.set('discountCode', discountCode);
          let tickets = await discountCode.get('tickets');
          tickets.forEach(ticket => {
            let ticketPrice = ticket.get('price');
            let taxRate = ticket.get('event.tax.rate');
            let discount = discountType === 'amount' ? Math.min(ticketPrice, discountValue) : ticketPrice * (discountValue / 100);
            ticket.set('discount', discount);
            if (taxRate && !this.showTaxIncludedMessage) {
              let ticketPriceWithTax = (ticketPrice - ticket.discount) * (1 + taxRate / 100);
              ticket.set('ticketPriceWithTax', ticketPriceWithTax);
            } else if (taxRate && this.showTaxIncludedMessage) {
              let includedTaxAmount = (taxRate * (ticketPrice - discount)) / (100 + taxRate);
              ticket.set('includedTaxAmount', includedTaxAmount);
            }
            this.discountedTickets.addObject(ticket);
            this.set('invalidPromotionalCode', false);
          });
        } else {
          this.set('invalidPromotionalCode', true);
        }
      } catch (e) {
        console.warn(e);
        if (this.invalidPromotionalCode) {
          this.set('invalidPromotionalCode', true);
        }
      }
      if (this.invalidPromotionalCode) {
        this.set('promotionalCodeApplied', false);
        this.notify.error('This Promotional Code is not valid');
      } else {
        this.set('promotionalCodeApplied', true);
        this.set('promotionalCode', 'Promotional code applied successfully');
      }
      this.order.set('amount', this.total);

    },
    updateOrder(ticket, count) {
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
