import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class EventRolesRoute extends Route {
  titleToken() {
    return this.l10n.t('Event Roles');
  }

  async model() {
    return hash({
      roles       : ['Attendee', 'Co-organizer', 'Moderator', 'Organizer', 'Owner', 'Track Organizer', 'Registrar'],
      services    : this.store.query('service', {}),
      permissions : this.store.query('event-role-permission', { 'page[size]': 35 })
    });
  }
}
