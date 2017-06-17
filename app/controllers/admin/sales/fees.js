import Ember from 'ember';
import { sumBy } from 'lodash';

const { Controller, computed } = Ember;

export default Controller.extend({
  ticketsTotal: computed(function() {
    return sumBy(this.get('model'), 'tickets');
  }),

  revenueTotal: computed(function() {
    return sumBy(this.get('model'), 'revenue');
  })
});
