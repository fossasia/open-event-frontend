import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Unread');
  },
  templateName: 'notifications/all',
  model() {
    return this.modelFor('notifications');
  }
});
