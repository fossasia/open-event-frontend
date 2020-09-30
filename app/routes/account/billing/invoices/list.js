import Route from '@ember/routing/route';
import moment from 'moment';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { action } from '@ember/object';
import { capitalize } from 'lodash-es';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    if (['paid', 'due', 'refunding', 'refunded'].includes(this.params.invoice_status)) {
      return this.l10n.t(capitalize(this.params.invoice_status));
    } else {
      return this.l10n.t('All');
    }
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'status';
    let filterOptions = [];
    if (['paid', 'due', 'refunding', 'refunded'].includes(params.invoice_status)) {
      filterOptions = [
        {
          name : 'status',
          op   : 'eq',
          val  : params.invoice_status
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
              name : 'issued-at',
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
      eventInvoices: await this.asArray(this.authManager.currentUser.query('eventInvoices', queryString)),
      params

    };

  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
