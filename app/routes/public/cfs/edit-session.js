import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Edit Session');
  },

  async model(params) {
    const eventDetails = this.modelFor('public');
    return {
      event : eventDetails,
      forms : await eventDetails.query('customForms', {
        sort         : 'id',
        'page[size]' : 0
      }),
      session: await this.store.findRecord('session', params.session_id, {
        include: 'session-type,track'
      }),
      tracks       : await eventDetails.query('tracks', {}),
      sessionTypes : await eventDetails.query('sessionTypes', {})
    };
  }
});
