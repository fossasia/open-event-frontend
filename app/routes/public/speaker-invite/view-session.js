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
    const speakerInvite = await this.store.findRecord('speaker-invite', params.invite_id, {
      include : 'session,event',
      reload  : true
    });
    const sessionDetails = await speakerInvite.query('session', {
      include : 'session-type,speakers,track,event,speaker-invites',
      reload  : true
    });
    const speaker = await eventDetails.query('speakers', {
      filter: [
        {
          name : 'email',
          op   : 'eq',
          val  : this.authManager.currentUser.email
        }
      ] });
    return {
      event : eventDetails,
      form  : await eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      }),
      session: sessionDetails,
      speakerInvite,
      speaker
    };
  }

  afterModel(model) {
    super.afterModel(...arguments);
    const user = this.authManager.currentUser;
    if (!user.isVerified || !(model.event.hasAccess(user) || (model.speakerInvite.email === user.email && model.speakerInvite.status === 'pending' && model.speaker.toArray().length))) {
      this.transitionTo('not-found');
    }
  }
}
