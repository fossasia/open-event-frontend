import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Email Preferences');
  },
  model() {
    return this.get('authManager.currentUser').query('emailNotifications', { include: 'event' });
  }
});
