import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class ViewRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    return model.session.get('title');
  }

  async model(params) {
    const eventDetails = this.modelFor('events.view');
    return {
      session: this.store.findRecord('session', params.session_id, {
        include: 'session-type,speakers,track,event,speaker-invites'
      }),
      form: await eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      })
    };
  }
}
