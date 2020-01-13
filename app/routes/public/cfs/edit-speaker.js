import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Edit Speaker');
  },

  async model(params) {
    const eventDetails = this.modelFor('public');
    return {
      event : eventDetails,
      forms : await eventDetails.query('customForms', {
        sort         : 'id',
        'page[size]' : 0
      }),
      speaker: await this.store.findRecord('speaker', params.speaker_id)
    };
  }
});
