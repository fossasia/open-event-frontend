import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return { roles: ['Attendee', 'Co-Organizer', 'Moderator', 'Organizer', 'Track Organizer'] };
  },
  titleToken() {
    return this.i18n.t('Event Roles');
  }
});
