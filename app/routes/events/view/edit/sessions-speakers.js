import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Route, RSVP } = Ember;

export default Route.extend(EventWizardMixin, {
  titleToken() {
    return this.l10n.t('Sessions & Speakers');
  },
  model() {
    let data = this.modelFor('events.view.edit');
    data.tracks = data.event.get('tracks');
    data.microlocations = data.event.get('microlocations');
    data.sessionTypes = data.event.get('sessionTypes');
    return RSVP.hash(data);
  }
});
