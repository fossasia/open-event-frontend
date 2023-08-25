import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const sessionTitle = model.session.title;
    return sessionTitle.concat(' - Edit');
  }

  async model(params) {
    const eventDetails = this.modelFor('events.view');
    return hash({
      event : eventDetails,
      form  : eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      }),
      session: this.store.findRecord('session', params.session_id, {
        include: 'track,session-type,speakers'
      }),
      tracks       : eventDetails.query('tracks', { 'page[size]': 0, sort: 'position' }),
      sessionTypes : eventDetails.query('sessionTypes', { 'page[size]': 0, sort: 'position' }),
      speakers     : eventDetails.query('speakers', {
        'page[size]': 0
      }),
      speaker: this.store.createRecord('speaker', {
        event : eventDetails,
        user  : this.authManager.currentUser
      })

    });
  }
}
