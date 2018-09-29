import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Event Roles');
  },
  async model() {
    return {
      roles       : ['Attendee', 'Co-organizer', 'Moderator', 'Organizer', 'Track Organizer', 'Registrar'],
      services    : await this.get('store').query('service', {}),
      permissions : await this.get('store').query('event-role-permission', { 'page[size]': 30 })
    };
  }
});
