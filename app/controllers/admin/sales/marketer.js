import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sumBy } from 'lodash';

export default Controller.extend({
  ticketsTotal: computed(function() {
    return sumBy(this.get('model'), 'tickets');
  }),
  salesTotal: computed(function() {
    return sumBy(this.get('model'), 'sales');
  }),
  discountsTotal: computed(function() {
    return sumBy(this.get('model'), 'discounts');
  })
});
