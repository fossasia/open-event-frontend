import Route from '@ember/routing/route';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Route.extend(EventWizardMixin, {

  titleToken() {
    return this.get('l10n').t('Ticket Buyer Form');
  },

  model() {
    return this.modelFor('events.view.edit');
  }
});
