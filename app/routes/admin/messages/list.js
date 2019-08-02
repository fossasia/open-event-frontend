import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {

  async model(params) {
    const searchField = 'recipient';
    let filterOptions = this.applySearchFilters([], params, searchField);
    let queryString = {
      filter        : filterOptions,
      'page[size]'  : params.per_page || 100,
      'page[number' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);
    return this.asArray(this.modelFor('admin.messages', queryString));
  }

}
