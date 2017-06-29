import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Call for Speakers');
  },

  model() {
    return RSVP.hash({
      event: this._super(...arguments)
    });
  }
});
