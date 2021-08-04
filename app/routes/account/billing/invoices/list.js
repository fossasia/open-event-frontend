import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { action } from '@ember/object';
import { capitalize } from 'lodash-es';

export default class extends Route.extend(EmberTableRouteMixin) {
  queryParams = {
    ...this.queryParams,
    user_id: {
      refreshModel: true
    }
  }

  titleToken() {
    if (['paid', 'due', 'refunding', 'refunded'].includes(this.params.invoice_status)) {
      return capitalize(this.params.invoice_status);
    } else {
      return this.l10n.t('All');
    }
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'status';
    let filterOptions = [];
    if (['paid', 'due', 'refunding', 'refunded', 'failed', 'resolved'].includes(params.invoice_status)) {
      filterOptions = [
        {
          name : 'status',
          op   : 'eq',
          val  : params.invoice_status
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
    const user = params.user_id ? await this.store.findRecord('user', params.user_id) : this.authManager.currentUser;
    return {
      eventInvoices: await this.asArray(user.query('eventInvoices', queryString)),
      params

    };

  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
