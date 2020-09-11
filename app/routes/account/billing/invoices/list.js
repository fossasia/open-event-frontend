import Route from '@ember/routing/route';
import moment from 'moment';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { action } from '@ember/object';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.params.invoice_status) {
      case 'paid':
        return this.l10n.t('Paid');
      case 'due':
        return this.l10n.t('Due');
      case 'upcoming':
        return this.l10n.t('Upcoming');
      case 'unpaid':
        return this.l10n.t('Unpaid');
      case 'refunding':
        return this.l10n.t('Refunding');
      case 'refunded':
        return this.l10n.t('Refunded');
      case 'all':
        return this.l10n.t('All');
    }
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'status';
    let filterOptions = [];
    if (params.invoice_status === 'paid' || params.invoice_status === 'due') {
      filterOptions = [
        {
          name : 'status',
          op   : 'eq',
          val  : params.invoice_status
        }
      ];
    } else if (params.invoice_status === 'unpaid') {
      filterOptions = [
        {
          name : 'status',
          op   : 'ne',
          val  : 'paid'
        }
      ];
    } else if (params.invoice_status === 'upcoming') {
      filterOptions = [
        {
          and: [
            {
              name : 'deleted-at',
              op   : 'eq',
              val  : null
            },
            {
              name : 'created-at',
              op   : 'ge',
              val  : moment().subtract(30, 'days').toISOString()
            }
          ]
        }
      ];
    }


    filterOptions = this.applySearchFilters(filterOptions, params, searchField);

    let queryString = {
      include        : 'event',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };

    queryString = this.applySortFilters(queryString, params);
    return {
      eventInvoices: await this.asArray(this.store.query('event-invoice', queryString)),
      params

    };

  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
