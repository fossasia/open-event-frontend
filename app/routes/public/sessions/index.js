import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Sessions');
  },
  model() {
    const eventDetails = this._super(...arguments).event;
    return RSVP.hash({
      event  : eventDetails,
      tracks : eventDetails.query('tracks', { include: 'sessions' })
    });
  }
});
