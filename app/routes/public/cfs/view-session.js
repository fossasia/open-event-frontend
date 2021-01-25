import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class EditSessionRoute extends Route {
  titleToken() {
    return this.l10n.t('View Session');
  }

  async beforeModel() {
    super.beforeModel(...arguments);
    if (!(this.session.isAuthenticated)) {
      this.transitionTo('not-found');
    }
  }

  async model(params) {
    const eventDetails = this.modelFor('public');
    const sessionDetails = await this.store.findRecord('session', params.session_id, {
      include : 'session-type,speakers,track,event',
      reload  : true
    });
    return {
      event : eventDetails,
      form  : await eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      }),
      session       : sessionDetails,
      speakersEmail : await sessionDetails.speakers.map(speaker => speaker.email)
    };
  }

  afterModel(model) {
    super.afterModel(...arguments);
    if (!(this.session.isAuthenticated && (this.authManager.currentUser.isAdmin || model.speakersEmail.includes(this.authManager.currentUser.email)))) {
      this.transitionTo('not-found');
    }
  }
}
