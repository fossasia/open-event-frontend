import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('System Images');
  },
  model() {
    return this.store.query('event-topic', {
      include : 'event-sub-topics',
      sort    : 'name'
    });
  },
  afterModel(model, transition) {
    this._super(...arguments);
    if (transition.targetName === 'admin.content.system-images.index') {
      this.replaceWith('admin.content.system-images.list', model.toArray()[0].id);
    }
  }
});
