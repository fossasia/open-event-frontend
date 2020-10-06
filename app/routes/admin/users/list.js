import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import moment from 'moment';

export default class extends Route.extend(EmberTableRouteMixin) {

  titleToken() {
    switch (this.params.users_status) {
      case 'active':
        return this.l10n.t('Active');
      case 'deleted':
        return this.l10n.t('Deleted');
      case 'inactive':
        return this.l10n.t('Inactive');
    }
  }

  beforeModel(transition) {
    super.beforeModel(...arguments);
    const userState = transition.to.params.users_status;
    if (!['all', 'deleted', 'active', 'inactive'].includes(userState)) {
      this.replaceWith('admin.users.view', userState);
    }
  }

  async model(params) {
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
    filterOptions = this.applySearchFilters(filterOptions, params, ['firstName', 'lastName', 'email']);

    let queryString = {
      include        : 'events',
      get_trashed    : true,
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };

    queryString = this.applySortFilters(queryString, params);
    return  this.asArray(this.store.query('user', queryString));
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
