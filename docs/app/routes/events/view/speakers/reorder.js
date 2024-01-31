import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { SPEAKERS_FILTER } from 'open-event-frontend/routes/public/speakers';

export default class SpeakersReorderRoute extends Route {
  titleToken() {
    return this.l10n.t('Reorder Speakers');
  }

  model() {
    const event = this.modelFor('events.view');
    const speakers = event.query('speakers', {
      sort         : 'order',
      'page[size]' : 0,
      public       : true,
      filter       : SPEAKERS_FILTER
    });
    return hash({
      event,
      speakers
    });
  }
}
