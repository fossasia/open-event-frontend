import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Create session');
  },
  async model() {
    const eventDetails = this.modelFor('events.view');
    return {
      event : eventDetails,
      form  : await eventDetails.query('customForms', {
        'page[size]' : 50,
        sort         : 'id'
      }),
      session: await this.get('store').createRecord('session', {
        event   : eventDetails,
        creator : this.get('authManager.currentUser')
      }),
      sessions: await eventDetails.query('sessions', {
      }),
      speaker: await this.get('store').createRecord('speaker', {
        event : eventDetails,
        user  : this.get('authManager.currentUser')
      }),
      tracks       : await eventDetails.query('tracks', {}),
      sessionTypes : await eventDetails.query('sessionTypes', {})
    };
  },
  resetController(controller) {
    this._super(...arguments);
    const model = controller.get('model');
    if (!controller.get('model.speaker.id')) {
      model.speaker.unloadRecord();
    }
    if (!controller.get('model.session.id')) {
      model.session.unloadRecord();
    }
  }
});
