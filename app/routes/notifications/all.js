import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.notification_state')) {
      case 'unread':
        return this.get('l10n').t('Unread');
      case 'all':
        return this.get('l10n').t('All');
    }
  },
  async model(params) {
    this.set('params', params);
    let filterOptions = [];

    let data = {
      unread: false
    };

    if (params.notification_state === 'unread') {
      filterOptions = [
        {
          name : 'is-read',
          op   : 'eq',
          val  : false
        }
      ];
      data.unread = true;
    }

    data.notifications = await this.get('authManager.currentUser').query('notifications', {
      include : 'notification-actions',
      sort    : '-received-at',
      filter  : filterOptions
    });

    return data;
  }
});
