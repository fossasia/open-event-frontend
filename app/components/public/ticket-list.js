import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';
import { sumBy } from 'lodash';

const { Component, computed } = Ember;

export default Component.extend(FormMixin, {
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
