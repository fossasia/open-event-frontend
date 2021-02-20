import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { hash } from 'rsvp';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    return this.l10n.t('Video Rooms');
  }

  beforeModel() {
    this._super(...arguments);
    const event = this.modelFor('events.view');
    const { currentUser } = this.authManager;
    if (!event.hasAccess(currentUser)) {
      this.transitionTo('public', event.id);
    }
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'title';
    let filterOptions = [];

    const event = this.modelFor('events.view');

    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      include        : 'video-stream.video-channel,video-stream.moderators',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 25,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);

    const rooms = this.asArray(event.query('microlocations', queryString));
    return hash({
      event,
      rooms
    });
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
