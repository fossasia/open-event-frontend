import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Upcoming');
  },
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('admin.users.view.tickets.list', 'upcoming');
  }
});
