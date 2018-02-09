import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Activity Logs');
  },

  model() {
    return this.get('store').query('activity', {
      'page[size]': 10
    });
  }
});
