import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('New Speaker');
  },

  async model() {
    const eventDetails = this.modelFor('public');
    const currentUser = this.get('authManager.currentUser');
    let userName;
    if (currentUser.firstName || currentUser.lastName) {
      userName = `${currentUser.firstName} ${currentUser.lastName}`;
    }

    return {
      event : eventDetails,
      forms : await eventDetails.query('customForms', {
        sort         : 'id',
        'page[size]' : 0
      }),
      speaker: await this.store.createRecord('speaker', {
        email    : currentUser.email,
        name     : userName,
        photoUrl : currentUser.avatarUrl,
        event    : eventDetails,
        user     : currentUser
      })
    };
  },
  resetController(controller) {
    this._super(...arguments);
    const model = controller.get('model.speaker');
    if (!model.id) {
      controller.get('model.speaker').unloadRecord();
    }
  }
});
