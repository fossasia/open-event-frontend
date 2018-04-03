import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Mail Logs');
  },

  model() {
    return this.get('store').query('mail', {
      'page[size]': 10
    });
  }
});
