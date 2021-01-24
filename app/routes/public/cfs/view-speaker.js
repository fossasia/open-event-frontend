import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class EditSessionRoute extends Route {
  titleToken() {
    return this.l10n.t('View Speaker');
  }

  async beforeModel() {
    super.beforeModel(...arguments);
    if (!(this.session.isAuthenticated)) {
      this.transitionTo('not-found');
    }
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
    if (!(this.session.isAuthenticated && (this.authManager.currentUser.isAdmin || this.authManager.currentUser.get('email') === model.speaker.get('email')))) {
      this.transitionTo('not-found');
    }
  }
}
