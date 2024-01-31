import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class ViewSessionRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('View Session');
  }

  async model(params) {
    const eventDetails = this.modelFor('public');
    const sessionDetails = await this.store.findRecord('session', params.session_id, {
      include : 'session-type,speakers,track,event,speaker-invites',
      reload  : true
    });
    return {
      event : eventDetails,
      form  : await eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      }),
      session: sessionDetails
    };
  }

  afterModel(model) {
    super.afterModel(...arguments);
    const user = this.authManager.currentUser;
    const speakersEmail = model.session.speakers.map(speaker => speaker.email?.toLowerCase());
    if (!(model.event.hasAccess(user) || speakersEmail.includes(user.email?.toLowerCase()))) {
      this.transitionTo('not-found');
    }
  }
}
