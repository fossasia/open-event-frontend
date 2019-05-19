import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Modules');
  },
  model() {
    return this.store.queryRecord('module', {});
  }
});
