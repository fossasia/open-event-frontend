import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Route } = Ember;

export default Route.extend(EventWizardMixin, {
  titleToken() {
    return this.l10n.t('Sponsors');
  },
  model() {
    return {
      parentData : this.modelFor('events.view.edit'),
      sponsors   : this.getSponsors()
    };
  }
});
