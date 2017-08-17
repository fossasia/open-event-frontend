import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Upcoming');
  },
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('my-tickets.list', 'upcoming');
  }
});
