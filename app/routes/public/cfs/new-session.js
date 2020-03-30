import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('New Session');
  },

  async model() {
    const eventDetails = this.modelFor('public');
    return {
      event : eventDetails,
      forms : await eventDetails.query('customForms', {
        sort         : 'id',
        'page[size]' : 0
      }),
      session: await this.store.createRecord('session', {
        event       : eventDetails,
        creator     : this.authManager.currentUser,
        track       : null,
        sessionType : null
      }),
      speaker: await eventDetails.query('speakers', {
        filter: [
          {
            name : 'email',
            op   : 'eq',
            val  : this.authManager.currentUser.email
          }
        ]
      }),
      tracks       : await eventDetails.query('tracks', {}),
      sessionTypes : await eventDetails.query('sessionTypes', {})
    };
  },
  resetController(controller) {
    this._super(...arguments);
    const model = controller.model.session;
    if (!model.id) {
      controller.model.session.unloadRecord();
    }
  }
});
