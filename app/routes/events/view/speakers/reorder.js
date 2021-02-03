import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class SpeakersReorderRoute extends Route {
  titleToken() {
    return this.l10n.t('Reorder Speakers');
  }

  model() {
    const event = this.modelFor('events.view');
    const speakers = event.query('speakers', {
      sort         : 'order',
      'page[size]' : 0,
      cache        : true,
      public       : true,
      filter       : [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            or: [
              {
                name : 'state',
                op   : 'eq',
                val  : 'accepted'
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
          }
        }
      ]
    });
    return hash({
      event,
      speakers
    });
  }
}
