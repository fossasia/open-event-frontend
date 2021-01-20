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
    let filterOptions = [];
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      include        : 'speakers,feedbacks,session-type,track',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 25,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);

    const groups =  this.asArray(this.authManager.currentUser.query('groups', queryString));


    return {
      groups
    };
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
