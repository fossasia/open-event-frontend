import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { action } from '@ember/object';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.params.group_status) {
      case 'live':
        return this.l10n.t('Live');
      case 'deleted':
        return this.l10n.t('Deleted');
      default:
        return this.l10n.t('Live');
    }
  }

  model(params) {
    this.set('params', params);
    let filterOptions = [];
    const searchField = 'name';
    if (params.group_status === 'live') {
      filterOptions = [
        {
          name : 'deleted-at',
          op   : 'eq',
          val  : null
        }
      ];
    } else if (params.group_status === 'deleted') {
      filterOptions = [
        {
          name : 'deleted-at',
          op   : 'ne',
          val  : null
        }
      ];
    } else {
      filterOptions = [];
    }
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      get_trashed    : true,
      include        : 'user,events,followers',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params, searchField);
    return  this.asArray(this.store.query('group', queryString));
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
