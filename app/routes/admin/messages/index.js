import Route from '@ember/routing/route';

export default Route.extend({
  templateName: 'admin/messages/list',
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('admin.messages.list');
  }
});
