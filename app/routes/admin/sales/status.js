import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Status');
  },
  model() {
    return this.store.query('event-invoice', { include: 'event,user' });
  }
});
