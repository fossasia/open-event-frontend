import Route from '@ember/routing/route';

export default class extends Route {
  titleToken() {
    return this.l10n.t('Admin Billing');
  }

  model() {
    return this.modelFor('admin.settings');
  }
}
