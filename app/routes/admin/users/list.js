import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.users_status')) {
      case 'active':
        return this.get('l10n').t('Active');
      case 'deleted':
        return this.get('l10n').t('Deleted');
    }
  },
  beforeModel(transition) {
    this._super(...arguments);
    const userState = transition.params[transition.targetName].users_status;
    if (!['all', 'deleted', 'active'].includes(userState)) {
      this.replaceWith('admin.users.view', userState);
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.users_status === 'active') {
      filterOptions = [
        {
          name : 'deleted-at',
          op   : 'eq',
          val  : null
        }
      ];
    } else if (params.users_status === 'deleted') {
      filterOptions = [
        {
          name : 'deleted-at',
          op   : 'ne',
          val  : null
        }
      ];
    }
    return this.get('store').query('user', {
      get_trashed  : true,
      filter       : filterOptions,
      'page[size]' : 10
    });
  }
});
