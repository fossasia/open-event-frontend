import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Settings');
  },
  async model() {
    let eventDetails = this.modelFor('events.view');
    return {
      event       : await eventDetails,
      roleInvites : await eventDetails.query('roleInvites', {}),
      roles       : await this.store.findAll('role')
    };
  }
});
