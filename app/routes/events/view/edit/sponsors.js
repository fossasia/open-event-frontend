import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

@classic
export default class SponsorsRoute extends Route.extend(EventWizardMixin) {
  titleToken() {
    return this.l10n.t('Sponsors');
  }

  async model() {
    const data = this.modelFor('events.view.edit');
    const sponsors = await data.event.query('sponsors', { 'page[size]': 0 });
    return {
      sponsors,
      ...data
    };
  }
}
