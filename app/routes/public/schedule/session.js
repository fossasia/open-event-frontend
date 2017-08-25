import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Sessions View');
  },
  model() {
    const eventDetails = this.modelFor('public');
    return RSVP.hash({
      event  : eventDetails,
      tracks : eventDetails.query('tracks', {
        'fields[track]': 'name,id'
      })
    });
  }
});
