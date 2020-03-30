import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Create session');
  },
  async model() {
    const eventDetails = this.modelFor('events.view');
    return {
      event : eventDetails,
      form  : await eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      }),
      speakers: await eventDetails.query('speakers', {
        include      : 'sessions',
        'page[size]' : 0
      }),
      session: await this.store.createRecord('session', {
        event    : eventDetails,
        creator  : this.authManager.currentUser,
        startsAt : null,
        endsAt   : null,
        speakers : []
      }),
      speaker: await this.store.createRecord('speaker', {
        event : eventDetails,
        user  : this.authManager.currentUser
      }),
      tracks       : await eventDetails.query('tracks', {}),
      sessionTypes : await eventDetails.query('sessionTypes', {})
    };
  },
  resetController(controller) {
    this._super(...arguments);
    const { model } = controller;
    if (!model.speaker.id) {
      model.speaker.unloadRecord();
    }
    if (!model.session.id) {
      model.session.unloadRecord();
    }
  }
});
