import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('All');
  },
  model() {
    return this.get('authManager.currentUser').query('notifications', {
      sort: '-received-at'
    });
  }
});
