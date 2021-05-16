import Event from 'open-event-frontend/models/event';
import Loader from 'open-event-frontend/services/loader';

export async function hasExhibitors(loader: Loader, event: Event): Promise<number> {
  const exhibitorFilter = [{
    name : 'status',
    op   : 'eq',
    val  : 'accepted'
  }];
  return (await loader.load(`/events/${event.id}/exhibitors?page[size]=1&filter=${JSON.stringify(exhibitorFilter)}`)).data.length;
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
