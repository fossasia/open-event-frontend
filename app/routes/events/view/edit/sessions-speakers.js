import Route from '@ember/routing/route';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Route.extend(EventWizardMixin, {

  titleToken() {
    return this.get('l10n').t('Sessions & Speakers');
  },

  async model() {
    let data = this.modelFor('events.view.edit');
    data.tracks = await data.event.get('tracks');
    data.microlocations = await data.event.get('microlocations');
    data.sessionTypes = await data.event.get('sessionTypes');
    data.speakersCall = await this.getOrCreate(data.event, 'speakersCall', 'speakers-call');
    data.customForms = await data.event.query('customForms', {
      sort         : 'field-identifier',
      'page[size]' : 50
    });
    return data;
  }
});
