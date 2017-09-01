import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Overview');
  },
  model() {
    return RSVP.hash({
      orderStats : this.modelFor('events.view').query('orderStatistics', {}),
      tickets    : this.modelFor('events.view').query('tickets', {})
    });
  }
});
