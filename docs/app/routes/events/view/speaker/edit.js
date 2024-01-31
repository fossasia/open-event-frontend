import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const speakerName = model.speaker.get('name');
    return speakerName.concat(' - Edit');
  }

  async model(params) {
    const eventDetails = this.modelFor('events.view');
    return hash({
      event : eventDetails,
      form  : eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      }),
      speaker: this.store.findRecord('speaker', params.speaker_id)
    });
  }
}
