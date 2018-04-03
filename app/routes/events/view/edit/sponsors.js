import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Route.extend(EventWizardMixin, {
  titleToken() {
    return this.l10n.t('Sponsors');
  },
  model() {
    let data = this.modelFor('events.view.edit');
    data.sponsors = data.event.get('sponsors');
    return RSVP.hash(data);
  }
});
