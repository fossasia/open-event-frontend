import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Email Preferences');
  },
  model() {
    return this.get('authManager.currentUser').query('emailNotifications', { include: 'event' });
  }
});
