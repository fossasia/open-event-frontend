import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Sessions');
  },
  async model() {
    const eventDetails = this.modelFor('public');
    return {
      event  : eventDetails,
      tracks : await eventDetails.query('tracks', {
        'fields[track]': 'name,id'
      })
    };
  }
});
