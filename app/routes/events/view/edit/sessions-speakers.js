import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Route } = Ember;

export default Route.extend(EventWizardMixin, {
  titleToken() {
    return this.i18n.t('Sessions & Speakers');
  },
  model() {
    return {
      parentData       : this._super(...arguments),
      sessionsSpeakers : this.getSessionSpeakers()
    };
  }
});
