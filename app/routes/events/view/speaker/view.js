import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class ViewRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    return model.speaker.get('name');
  }

  async model(params) {
    const eventDetails = this.modelFor('events.view');
    return {
      speaker: this.store.findRecord('speaker', params.speaker_id, {
        include: 'sessions,event'
      }),
      form: await eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      })
    };
  }
}
