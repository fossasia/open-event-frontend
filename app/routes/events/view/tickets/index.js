import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Overview');
  },
  model() {
    return this.modelFor('events.view').query('orderStatistics', {});
  }
});
