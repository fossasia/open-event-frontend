import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.get('params.ticket_status')) {
      case 'completed':
        return this.l10n.t('Completed');
      case 'pending':
        return this.l10n.t('Pending');
      case 'placed':
        return this.l10n.t('Placed');
      case 'deleted':
        return this.l10n.t('Deleted');
      case 'expired':
        return this.l10n.t('Expired');
      case 'cancelled':
        return this.l10n.t('Cancelled');
      case 'all':
        return this.l10n.t('All');
    }
  }

  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    const searchField='order';
    if (params.ticket_status !== 'all' && params.ticket_status !== 'deleted') {
      filterOptions = [
        {
          name : 'status',
          op   : 'eq',
          val  : params.ticket_status
        }
      ];
    } else if (params.ticket_status === 'deleted') {
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
      get_trashed    : params.ticket_status === 'deleted',
      include        : 'tickets,user',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);

    return {
      data : await this.store.query('order', queryString)
    };
  }
}