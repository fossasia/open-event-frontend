import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Event from 'open-event-frontend/models/event';
import Session from 'open-event-frontend/models/session';
import User from 'open-event-frontend/models/user';

interface Model { user: User, event: Event, sessions: Session[] }

export default class PublicSessionsUserView extends Route.extend() {
  @service declare store;

  renderTemplate(): void {
    this.render('public/session/view/user/view', { into: 'public' });
  }

  titleToken(model: Model): string {
    return model.user.get('resolvedName') + '\'s Schedule'
  }

  async model(params: { user_id: string }): Promise<Model> {
    const event = this.modelFor('public') as Event;
    let user = this.store.peekRecord('user', params.user_id);

    const favs = await event.query('sessionFavourites', {
      filter       : [{ name: 'user', op: 'has', val: { name: 'id', op: 'eq', val: params.user_id } }],
      include      : 'session.track,session.microlocation,session.session-type,session.speakers,session.event,session.favourite,user',
      'page[size]' : 0
    });
    if (favs.toArray() && !user) {
      user = favs.toArray()[0].user; // eslint-disable-line prefer-destructuring
    }

    const sessions = [];
    for (const fav of favs.toArray()) {
      sessions.push(await fav.session); // eslint-disable-line no-await-in-loop
    }

    return {
      user,
      event,
      sessions
    };
  }
}
