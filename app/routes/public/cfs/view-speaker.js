import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class EditSessionRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('View Speaker');
  }

  async model(params) {
    const eventDetails = this.modelFor('public');
    return {
      event   : eventDetails,
      speaker : this.store.findRecord('speaker', params.speaker_id, {
        include: 'sessions,event'
      }),
      form: await eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      })
    };
  }

  afterModel(model) {
    super.afterModel(...arguments);
    const user = this.authManager.currentUser;
    if (!(model.event.hasAccess(user) || user.email?.toLowerCase() === model.speaker.get('email')?.toLowerCase())) {
      this.transitionTo('not-found');
    }
  }
}
