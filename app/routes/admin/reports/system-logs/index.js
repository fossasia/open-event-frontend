import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this._super(...arguments);
    this.replaceWith('admin.reports.system-logs.activity-logs');
  }
});
