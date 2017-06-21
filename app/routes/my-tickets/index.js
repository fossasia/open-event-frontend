import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Upcoming');
  },

  model() {
    return this.modelFor('my-tickets');
  }

});
