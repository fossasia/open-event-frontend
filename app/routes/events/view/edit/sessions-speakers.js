import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

@classic
export default class SessionsSpeakersRoute extends Route.extend(EventWizardMixin) {
  titleToken() {
    return this.l10n.t('Sessions & Speakers');
  }

  async model() {
    let data = this.modelFor('events.view.edit');
    data.tracks = await data.event.get('tracks');
    data.microlocations = await data.event.get('microlocations');
    data.sessionTypes = await data.event.get('sessionTypes');
    data.speakersCall = await this.getOrCreate(data.event, 'speakersCall', 'speakers-call');
    // Only get session/speaker custom forms.
    let customFormFilterOptions = [{
      or: [
        {
          name : 'form',
          op   : 'eq',
          val  : 'speaker'
        },
        {
          name : 'form',
          op   : 'eq',
          val  : 'session'
        }
      ]
    }];
    data.customForms = await data.event.query('customForms', {
      filter       : customFormFilterOptions,
      sort         : 'field-identifier',
      'page[size]' : 50
    });
    return data;
  }
}
