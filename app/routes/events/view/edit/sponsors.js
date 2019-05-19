import Route from '@ember/routing/route';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Route.extend(EventWizardMixin, {

  titleToken() {
    return this.l10n.t('Sponsors');
  },

  async model() {
    let data = this.modelFor('events.view.edit');
    data.sponsors = await data.event.get('sponsors');
    return data;
  }
});
