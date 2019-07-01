import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.l10n.t('Billing Info');
  },
  beforeModel() {
    this._super(...arguments);
    this.replaceWith('account.billing-info.payment-info');
  }
});
