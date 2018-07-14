import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { sumBy } from 'lodash';

export default Component.extend(FormMixin, {
  tickets: computed(function() {
    return this.get('data.tickets').sortBy('position');
  }),

  total: computed('data.tickets.@each.orderQuantity', function() {
    return sumBy(this.get('tickets').toArray(),
      ticket => ticket.getWithDefault('price', 0) * ticket.getWithDefault('orderQuantity', 0)
    );
  })
});
