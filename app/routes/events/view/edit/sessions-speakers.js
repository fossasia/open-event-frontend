import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { allSettled } from 'rsvp';

@classic
export default class SessionsSpeakersRoute extends Route.extend(EventWizardMixin) {
  titleToken() {
    return this.l10n.t('Sessions & Speakers');
  }

  async model() {
    const data = this.modelFor('events.view.edit');
    const tracksPromise = data.event.get('tracks');
    const microlocationsPromise = data.event.get('microlocations');
    const sessionTypesPromise = data.event.get('sessionTypes');
    const speakersCallPromise = this.getOrCreateCFS(data.event);
    // Only get session/speaker custom forms.
    const customFormFilterOptions = [{
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
    const customFormsPromise = data.event.query('customForms', {
      filter       : customFormFilterOptions,
      sort         : 'id',
      'page[size]' : 50
    });

    const [tracks, microlocations, sessionTypes, speakersCall, customForms] = (await allSettled([tracksPromise, microlocationsPromise, sessionTypesPromise, speakersCallPromise, customFormsPromise])).map(promise => promise.value);
    return {
      ...data,
      tracks,
      microlocations,
      sessionTypes,
      speakersCall,
      customForms
    };
  }

  async getOrCreateCFS(event) {
    try {
      return await event.get('speakersCall');
    } catch {
      return this.store.createRecord('speakers-call', {
        event
      });
    }
  }
}
