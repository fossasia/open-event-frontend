import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('l10n').t('Notifications');
  },
  async model() {
    let filterOptions = [
      {
        name : 'is-read',
        op   : 'eq',
        val  : false
      }
    ];

    let data = {};

    data.notifications = await this.get('authManager.currentUser').query('notifications', {
      include : 'notification_actions',
      filter  : filterOptions,
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
