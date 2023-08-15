import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { hash } from 'rsvp';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    return this.l10n.t('Chat');
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
    params.sort_by = 'position';
    params.sort_dir = 'ASC';
    queryString = this.applySortFilters(queryString, params);

    const rooms = this.asArray(event.query('microlocations', queryString));
    const videoStream = event.query('videoStream', {}).then(videoStream => this.asArray(videoStream)).catch(e => {console.error(e)});
    return hash({
      event,
      rooms,
      videoStream
    });
  }
}
