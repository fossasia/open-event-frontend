import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import { sumBy } from 'lodash';
import { A } from '@ember/array';

export default Component.extend(FormMixin, {
  store: service(),

  promotionalCodeApplied: false,

  accessCodeTickets: A(),

  tickets: computed(function() {
    return this.get('data').sortBy('position');
  }),
  hasTicketsInOrder: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.get('tickets').toArray(),
      ticket => ticket.getWithDefault('orderQuantity', 0)
    ) > 0;
  }),

  total: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.get('tickets').toArray(),
      ticket => ticket.getWithDefault('price', 0) * ticket.getWithDefault('orderQuantity', 0)
    );
  }),
  actions: {
    togglePromotionalCode() {
      this.toggleProperty('enterPromotionalCode');
      if (this.get('enterPromotionalCode')) {
        this.set('promotionalCode', '');
      } else {
        this.set('promotionalCodeApplied', false);
        this.get('accessCodeTickets').forEach(ticket => {
          ticket.set('isHidden', true);
          this.get('tickets').removeObject(ticket);
        });
        this.get('accessCodeTickets').clear();
      }
    },
    applyPromotionalCode() {
      this.onValid(async() => {
        let promotionalCode = this.get('promotionalCode');
        await this.get('store').findRecord('access-code', promotionalCode)
          .then(accessCode => {
            accessCode.get('tickets')
              .then(tickets => {
                tickets.forEach(ticket => {
                  ticket.set('isHidden', false);
                  this.get('tickets').addObject(ticket);
                  this.get('accessCodeTickets').addObject(ticket);
                });
              })
              .catch(e => {
                this.get('notify').error(e);
              })
              .finally(() => {
                this.set('promotionalCodeApplied', true);
                this.set('promotionalCode', 'Promotional code applied successfully');
              });
          })
          .catch(() => {
            this.get('notify').error('Invalid Promotional Code');
          });
      });
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
