import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Event Roles');
  },
  async model() {
    return {
      roles       : ['Attendee', 'Co-organizer', 'Moderator', 'Organizer', 'Owner', 'Track Organizer', 'Registrar'],
      services    : await this.store.query('service', {}),
      permissions : await this.store.query('event-role-permission', { 'page[size]': 35 })
    };
  }
});
