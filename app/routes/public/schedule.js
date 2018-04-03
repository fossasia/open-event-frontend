import Route from '@ember/routing/route';
import RSVP from 'rsvp';

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
