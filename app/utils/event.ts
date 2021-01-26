import Event from 'open-event-frontend/models/event';
import { SPEAKERS_FILTER } from 'open-event-frontend/routes/public/speakers';
import Loader from 'open-event-frontend/services/loader';

export async function hasSpeakers(loader: Loader, event: Event): Promise<number> {
  return (await loader.load(`/events/${event.id}/speakers?cache=true&public=true&fields[speaker]=id&page[size]=1&filter=${JSON.stringify(SPEAKERS_FILTER)}`)).data.length;
}

export async function hasSessions(loader: Loader, event: Event): Promise<number> {
  const filters = [{
    or: [
      {
        name : 'state',
        op   : 'eq',
        val  : 'confirmed'
      },
      {
        name : 'state',
        op   : 'eq',
        val  : 'accepted'
      }
    ]
  }];
  return (await loader.load(`/events/${event.id}/sessions?cache=true&public=true&fields[session]=id&page[size]=1&filter=${JSON.stringify(filters)}`)).data.length;
}
