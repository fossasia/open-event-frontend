import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Billing Info');
  }

  beforeModel() {
    super.beforeModel(...arguments);
    this.replaceWith('account.billing.invoices');
  }
}
