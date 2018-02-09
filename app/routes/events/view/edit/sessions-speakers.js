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
    data.speakersCall = this.getOrCreate(data.event, 'speakersCall', 'speakers-call');
    data.customForms = data.event.query('customForms', {
      sort         : 'field-identifier',
      'page[size]' : 50
    });
    return RSVP.hash(data);
  }
});
