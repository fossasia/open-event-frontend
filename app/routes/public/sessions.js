import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Sessions');
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
