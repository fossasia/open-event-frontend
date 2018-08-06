import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('All');
  },
  async model() {
    let data = {};

    data.notifications = await this.get('authManager.currentUser').query('notifications', {
      include : 'notification_actions',
      sort    : '-received-at',
      reload  : true
    });

    let actions = await this.get('store').peekAll('notification-action');

    for (let notification of data.notifications ? data.notifications.toArray() : []) {
      if (!notification.actions) {
        notification.actions = actions.filter(action => action.notificationId === notification.id);
      }
    }

    return data;
  }
});
