import Route from '@ember/routing/route';

import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    return this.l10n.t('Import');
  }

  async model(params) {
    const searchField = 'result';
    let filterOptions = [];
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.per_page || 1
    };
    queryString = this.applySortFilters(queryString, params);


    return {
      importJobs: await this.asArray(this.store.query('importJob', queryString))
    };
  }
}
