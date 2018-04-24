import Route from '@ember/routing/route';

export default Route.extend({
  templateName: 'admin/users/list',
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('admin.users.list', 'all');
  }
});
