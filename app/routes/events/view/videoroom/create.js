import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class CreateRoute extends Route {
  titleToken() {
    return this.l10n.t('Create Video Room');
  }

  async model() {
    const eventDetails = this.modelFor('events.view');
    return {
      event : eventDetails,
      rooms : await eventDetails.query('microlocations', {
        'page[size]': 0
      }),
      stream: await this.store.createRecord('video-stream', {
        rooms: []
      })
    };
  }
}
