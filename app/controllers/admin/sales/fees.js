import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sumBy } from 'lodash';

export default Controller.extend({
  ticketsTotal: computed(function() {
    return sumBy(this.get('model'), 'tickets');
  }),

  revenueTotal: computed(function() {
    return sumBy(this.get('model'), 'revenue');
  })
});
