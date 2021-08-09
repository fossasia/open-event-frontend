import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { debounce } from 'lodash-es';
import { hash } from 'rsvp';

@classic
export default class GroupsRoute extends Route {
  titleToken() {
    return this.l10n.t('Explore Groups');
  }

  /**
   * Load filtered events based on the given params
   *
   * @param params
   * @return {*}
   * @private
   */

  _loadGroups(params) {
    const filterOptions = [];

    if (params.name) {
      filterOptions.push({
        name : 'name',
        op   : 'ilike',
        val  : `%${params.name}%`
      });
    }

    return this.infinity.model('group', {
      include      : 'events',
      filter       : filterOptions,
      sort         : 'name',
      perPage      : 6,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]'
    });

  }

  async model(params) {

    return hash({
      filteredGroups: this._loadGroups(params)
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('filteredGroups', model.filteredGroups);
    this.set('controller', controller);
  }

  debouncedFilterChange = debounce(async params => {
    if (this.controller) {
      this.controller.set('filteredGroups', await this._loadGroups(params));
      this.controller.set('filters', params);
    }
  }, 250)

  @action
  queryParamsDidChange(change, params) {
    this.debouncedFilterChange(params);
  }

  resetController(controller, isExiting, transition) {
    super.resetController(...arguments);
    if (transition.to.name !== 'explore.events') {
      controller.clearAllFilters();
    }
  }
}
