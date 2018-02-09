import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Schedule');
  },

  model() {
    return RSVP.hash({
      event: this.modelFor('public')
    });
  }
});
