import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { action } from '@ember/object';
import { hash } from 'rsvp';

export default class ExhibitorsListRoute extends Route.extend(EmberTableRouteMixin) {

  titleToken() {
    return this.l10n.t('Exhibitors');
  }

  beforeModel() {
    super.beforeModel(...arguments);
    const event = this.modelFor('events.view');
    const { currentUser } = this.authManager;
    if (!(currentUser.isAnAdmin || currentUser.email === event.owner.get('email') || event.organizers.includes(currentUser)
      || event.coorganizers.includes(currentUser) || event.trackOrganizers.includes(currentUser)
      || event.registrars.includes(currentUser) || event.moderators.includes(currentUser))) {
      this.transitionTo('public', event.id);
    }
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'name';
    let filterOptions = [];

    const event = this.modelFor('events.view');

    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      filter         : filterOptions,
      'page[size]'   : params.per_page || 25,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);

    const exhibitors = this.asArray(event.query('exhibitors', queryString));
    return hash({
      event,
      exhibitors
    });
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
