import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

@classic
export default class IndexRoute  extends Route.extend(EmberTableRouteMixin) {

  titleToken() {
    return this.l10n.t('Overview');
  }


  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    const searchField = 'name';
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);
    return  this.asArray(this.store.query('admin-sales-by-event', queryString));
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
