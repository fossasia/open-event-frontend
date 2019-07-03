import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Invoices');
  },
  model() {
    return this.store.query('event-invoice', { include: 'event,user' });
  }
});
