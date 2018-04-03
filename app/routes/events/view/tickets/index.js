import Route from '@ember/routing/route';
import RSVP from 'rsvp';

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
