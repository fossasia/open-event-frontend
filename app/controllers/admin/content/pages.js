import Ember from 'ember';
import { find, map, uniqBy } from 'lodash';

const { Controller, computed } = Ember;

export default Controller.extend({
  footerPages: computed.filterBy('model', 'menu', 'footer'),

  eventPages: computed.filterBy('model', 'menu', 'event'),

  places: computed('model', function() {
    const data = this.get('model');
    return map(uniqBy(data, 'menu'), 'menu');
  }),

  actions: {
    updateCurrentPage(url) {
      var form = find(this.get('model'), { path: url });
      this.set('isFormOpen', true);
      this.set('currentForm', form);
    }
  }
});
