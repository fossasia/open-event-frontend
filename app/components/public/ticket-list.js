import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import { sumBy } from 'lodash';
import { A } from '@ember/array';

export default Component.extend(FormMixin, {
  store: service(),

  promotionalCodeApplied: false,

  isUnverified: computed('session.isAuthenticated', 'authManager.currentUser.isVerified', function() {
    return this.get('session.isAuthenticated')
      && !this.get('authManager.currentUser.isVerified');
  }),

  shouldDisableOrderButton: computed('isUnverified', 'hasTicketsInOrder', function() {
    return this.get('isUnverified') || !(this.get('hasTicketsInOrder'));
  }),

  accessCodeTickets : A(),
  discountedTickets : A(),

  invalidPromotionalCode: false,

  tickets: computed(function() {
    return this.get('data').sortBy('position');
  }),
  hasTicketsInOrder: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.get('tickets').toArray(),
      ticket => ticket.getWithDefault('orderQuantity', 0)
    ) > 0;
  }),

  total: computed('tickets.@each.orderQuantity', 'tickets.@each.discount', function() {
    return sumBy(this.get('tickets').toArray(),
      ticket => (ticket.getWithDefault('price', 0) - ticket.getWithDefault('discount', 0)) * ticket.getWithDefault('orderQuantity', 0)
    );
  }),
  actions: {
    async togglePromotionalCode(queryParam) {
      this.toggleProperty('enterPromotionalCode');
      if (this.get('enterPromotionalCode') && !queryParam) {
        this.set('promotionalCode', '');
      } else {
        if (queryParam) {
          this.set('promotionalCode', queryParam);
          this.send('applyPromotionalCode');
        } else {
          this.set('promotionalCodeApplied', false);
          let order = this.get('order');
          order.set('accessCode', undefined);
          order.set('discountCode', undefined);
          this.get('accessCodeTickets').forEach(ticket => {
            ticket.set('isHidden', true);
            this.get('tickets').removeObject(ticket);
          });
          this.get('discountedTickets').forEach(ticket => {
            ticket.set('discount', 0);
          });
          this.get('accessCodeTickets').clear();
          this.get('discountedTickets').clear();
        }

      }
    },
    async applyPromotionalCode() {
      let promotionalCode = this.get('promotionalCode');
      let order = this.get('order');
      try {
        let accessCode = await this.get('store').findRecord('access-code', promotionalCode, {});
        order.set('accessCode', accessCode);
        let tickets = await accessCode.get('tickets');
        tickets.forEach(ticket => {
          ticket.set('isHidden', false);
          this.get('tickets').addObject(ticket);
          this.get('accessCodeTickets').addObject(ticket);
          this.set('invalidPromotionalCode', false);
        });
      } catch (e) {
        this.set('invalidPromotionalCode', true);
      }
      try {
        let discountCode = await this.get('store').findRecord('discount-code', promotionalCode, {
          include: 'tickets'
        });
        let discountType = discountCode.get('type');
        let discountValue = discountCode.get('value');
        order.set('discountCode', discountCode);
        let tickets = await discountCode.get('tickets');
        tickets.forEach(ticket => {
          let ticketPrice = ticket.get('price');
          if (discountType === 'amount') {
            ticket.set('discount', Math.min(ticketPrice, discountValue));
            this.get('discountedTickets').addObject(ticket);
          } else {
            ticket.set('discount', ticketPrice * (discountValue / 100));
            this.get('discountedTickets').addObject(ticket);
          }
          this.set('invalidPromotionalCode', false);
        });
      } catch (e) {
        if (this.get('invalidPromotionalCode')) {
          this.set('invalidPromotionalCode', true);
        }
      }
      if (this.get('invalidPromotionalCode')) {
        this.set('promotionalCodeApplied', false);
        this.notify.error('This Promotional Code is not valid');
      } else {
        this.set('promotionalCodeApplied', true);
        this.set('promotionalCode', 'Promotional code applied successfully');
      }
      order.set('amount', this.get('total'));

    },
    updateOrder(ticket, count) {
      let order = this.get('order');
      ticket.set('orderQuantity', count);
      order.set('amount', this.get('total'));
      if (!this.get('total')) {
        order.set('amount', null);
      }
      if (count > 0) {
        order.tickets.addObject(ticket);
      } else {
        if (order.tickets.includes(ticket)) {
          order.tickets.removeObject(ticket);
        }
      }
    },
    placeOrder() {
      if (!this.get('session.isAuthenticated')) {
        this.set('isLoginModalOpen', true);
        return;
      }
      let order = this.get('order');
      let event = order.get('event');
      order.tickets.forEach(ticket => {
        let numberOfAttendees = ticket.orderQuantity;
        while (numberOfAttendees--) {
          this.get('attendees').addObject(this.store.createRecord('attendee', {
            firstname : 'John',
            lastname  : 'Doe',
            email     : 'johndoe@example.com',
            event,
            ticket
          }));
        }
      });
      this.sendAction('save');
    }
  },
  didInsertElement() {
    this.get('data').forEach(ticket => {
      ticket.set('discount', 0);
    });
    if (this.get('code')) {
      this.send('togglePromotionalCode', this.get('code'));
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
              prompt : this.get('l10n').t('Please enter the promotional Code')
            }
          ]
        }
      }
    };
  }
});
