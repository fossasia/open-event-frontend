import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Unread');
  },
  templateName: 'notifications/all',
  model() {
    return this.get('authManager.currentUser').get('notifications').filterBy('isRead', false);
  }
});
