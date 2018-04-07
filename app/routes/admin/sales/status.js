import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Status');
  },
  model() {
    return this.store.query('event-invoice', { include: 'event,user' });
  }
});
