import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import { sumBy } from 'lodash-es';
import { A } from '@ember/array';

export default Component.extend(FormMixin, {
  store: service(),

  promotionalCodeApplied: false,

  isUnverified: computed('session.isAuthenticated', 'authManager.currentUser.isVerified', function() {
    return this.get('session.isAuthenticated')
      && !this.get('authManager.currentUser.isVerified');
  }),

  shouldDisableOrderButton: computed('isUnverified', 'hasTicketsInOrder', function() {
    return !this.hasTicketsInOrder;
  }),

  accessCodeTickets : A(),
  discountedTickets : A(),

  invalidPromotionalCode: false,

  tickets: computed(function() {
    return this.data.sortBy('position');
  }),
  hasTicketsInOrder: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.tickets.toArray(),
      ticket => ticket.getWithDefault('orderQuantity', 0)
    ) > 0;
  }),

  total: computed('tickets.@each.orderQuantity', 'tickets.@each.discount', function() {
    return sumBy(this.tickets.toArray(),
      ticket => (ticket.getWithDefault('price', 0) - ticket.getWithDefault('discount', 0)) * ticket.getWithDefault('orderQuantity', 0)
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
        let accessCode = await this.store.findRecord('access-code', this.promotionalCode, {});
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
        let discountCode = await this.store.findRecord('discount-code', this.promotionalCode, {
          include: 'tickets'
        });
        let discountCodeEvent = await discountCode.get('event');
        if (this.currentEventIdentifier === discountCodeEvent.identifier) {
          let discountType = discountCode.get('type');
          let discountValue = discountCode.get('value');
          this.order.set('discountCode', discountCode);
          let tickets = await discountCode.get('tickets');
          tickets.forEach(ticket => {
            let ticketPrice = ticket.get('price');
            if (discountType === 'amount') {
              ticket.set('discount', Math.min(ticketPrice, discountValue));
              this.discountedTickets.addObject(ticket);
            } else {
              ticket.set('discount', ticketPrice * (discountValue / 100));
              this.discountedTickets.addObject(ticket);
            }
            this.set('invalidPromotionalCode', false);
          });
        } else {
          this.set('invalidPromotionalCode', true);
        }
      } catch (e) {
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
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        promotionalCode: {
          identifier : 'promotional_code',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the promotional Code')
            }
          ]
        }
      }
    };
  }
});
