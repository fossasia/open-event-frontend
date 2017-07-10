import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';
import { sumBy } from 'lodash';

const { Component, computed } = Ember;

export default Component.extend(FormMixin, {
  classNames: ['ui', 'segments', 'ticket-list'],

  hasTicketsInOrder: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.get('tickets'), 'orderQuantity') > 0;
  }),

  total: computed('tickets.@each.orderQuantity', function() {
    let sum = 0.0;
    this.get('tickets').forEach(ticket => {
      sum += (ticket.price * ticket.orderQuantity);
    });
    return sum;
  }),
  actions: {
    togglePromotionalCode() {
      this.toggleProperty('enterPromotionalCode');
    },
    applyPromotionalCode() {
      this.onValid(() => {
      });
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
