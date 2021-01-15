import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const sessionTitle = model.session.title;
    return sessionTitle.concat(' - Edit');
  }

  async model(params) {
    const eventDetails = this.modelFor('events.view');
    return {
      event : eventDetails,
      form  : await eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      }),
      session: await this.store.findRecord('session', params.session_id, {
        include: 'track,session-type,speakers'
      }),
      tracks       : await eventDetails.query('tracks', {}),
      sessionTypes : await eventDetails.query('sessionTypes', {}),
      speakers     : await eventDetails.query('speakers', {
        'page[size]': 0
      }),
      speaker: await this.store.createRecord('speaker', {
        event : eventDetails,
        user  : this.authManager.currentUser
      })

    };
  }
}
