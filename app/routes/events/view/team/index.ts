import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import DS from 'ember-data';

export default class EventsViewTeamIndex extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  model(): unknown {
    const event = this.modelFor('events.view') as DS.Store;
    return hash({
      event,
      roleInvites: event.query('roleInvites', {
        include: 'role'
      }),
      usersEventsRoles: event.query('roles', {
        include: 'user,role'
      }),
      roles: this.store.findAll('role')
    });
  }
}
