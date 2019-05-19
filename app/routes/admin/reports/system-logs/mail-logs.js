import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Mail Logs');
  },

  model() {
    return this.store.query('mail', {
      'page[size]' : 100,
      sort         : '-time'
    });
  }
});
