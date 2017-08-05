import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Route, RSVP } = Ember;

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
