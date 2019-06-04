import Route from '@ember/routing/route';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Route.extend(EventWizardMixin, {

  titleToken() {
    return this.l10n.t('Basic Details');
  },

  model() {
    return this.modelFor('events.view.edit');
  }
});
