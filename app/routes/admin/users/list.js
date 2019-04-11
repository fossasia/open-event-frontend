import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    switch (this.get('params.users_status')) {
      case 'active':
        return this.get('l10n').t('Active');
      case 'deleted':
        return this.get('l10n').t('Deleted');
      case 'inactive':
        return this.get('l10n').t('Inactive');
    }
  },
  beforeModel(transition) {
    this._super(...arguments);
    const userState = transition.params[transition.targetName].users_status;
    if (!['all', 'deleted', 'active', 'inactive'].includes(userState)) {
      this.replaceWith('admin.users.view', userState);
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.users_status === 'active') {
      filterOptions = [
        {
          and: [
            {
              name : 'deleted-at',
              op   : 'eq',
              val  : null
            },
            {
              name : 'last-accessed-at',
              op   : 'ge',
              val  : moment().subtract(1, 'Y').toISOString()
            }
          ]
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
    } else if (params.users_status === 'inactive') {
      filterOptions = [
        {
          and: [
            {
              or: [
                {
                  name : 'last-accessed-at',
                  op   : 'eq',
                  val  : null
                },
                {
                  name : 'last-accessed-at',
                  op   : 'lt',
                  val  : moment().subtract(1, 'Y').toISOString()
                }
              ]
            },
            {
              name : 'deleted-at',
              op   : 'eq',
              val  : null
            }
          ]
        }
      ];
    }
    return this.get('store').query('user', {
      include      : 'events',
      get_trashed  : true,
      filter       : filterOptions,
      'page[size]' : 10
    });
  },
  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
