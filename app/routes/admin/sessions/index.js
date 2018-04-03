import Route from '@ember/routing/route';

export default Route.extend({
  templateName: 'admin/sessions/list',
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('admin.sessions.list', 'all');
  }
});
