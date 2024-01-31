import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
@classic
export default class AllRoute extends Route {
  titleToken() {
    switch (this.params.notification_state) {
      case 'unread':
        return this.l10n.t('Unread');
      case 'all':
        return this.l10n.t('All');
    }
  }

  async model(params) {
    this.set('params', params);
    let filterOptions = [];

    const data = {
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

    data.notifications = this.infinity.model('notifications', {
      perPage      : 10,
      startingPage : 1,
      sort         : '-created-at',
      store        : this.authManager.currentUser,
      filter       : filterOptions,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]'
    });

    return data;
  }
}
