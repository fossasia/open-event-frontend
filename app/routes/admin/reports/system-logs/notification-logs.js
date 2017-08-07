import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Notification Logs');
  },

  model() {
    return this.get('store').query('notification', {
      include      : 'user',
      'page[size]' : 10
    });
  }
});
