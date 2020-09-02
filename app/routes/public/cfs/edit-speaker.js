import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class EditSpeakerRoute extends Route {
  titleToken() {
    return this.l10n.t('Edit Speaker');
  }

  async model(params) {
    const eventDetails = this.modelFor('public');
    return {
      event : eventDetails,
      forms : await eventDetails.query('customForms', {
        filter: [{
          name : 'form',
          op   : 'eq',
          val  : 'speaker'
        }],
        sort         : 'id',
        'page[size]' : 0
      }),
      speaker: await this.store.findRecord('speaker', params.speaker_id)
    };
  }
}
