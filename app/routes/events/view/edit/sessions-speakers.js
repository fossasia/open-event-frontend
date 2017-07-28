import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Route } = Ember;

export default Route.extend(EventWizardMixin, {
  titleToken() {
    return this.l10n.t('Sessions & Speakers');
  },
  model() {
    return {
      parentData       : this.modelFor('events.view.edit'),
      sessionsSpeakers : this.getSessionSpeakers()
    };
  }
});
