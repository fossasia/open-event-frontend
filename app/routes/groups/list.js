import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    return this.l10n.t('Groups');
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'name';
    const filterOptions = this.applySearchFilters([], params, searchField);
    let queryString = {
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 4
    };
    queryString = this.applySortFilters(queryString, params);
    return this.asArray(this.authManager.currentUser.query('groups', queryString));
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
