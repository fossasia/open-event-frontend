import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Create session');
  },
  model() {
    var eventDetails = this.modelFor('events.view');
    return RSVP.hash({
      event : eventDetails,
      form  : eventDetails.query('customForms', {
        'page[size]' : 50,
        sort         : 'id'
      }),
      session: this.get('store').createRecord('session', {
        event : eventDetails,
        user  : this.get('authManager.currentUser')
      }),
      speaker: this.get('store').createRecord('speaker', {
        event : eventDetails,
        user  : this.get('authManager.currentUser')
      }),
      tracks       : eventDetails.query('tracks', {}),
      sessionTypes : eventDetails.query('sessionTypes', {})
    });
  }
});
