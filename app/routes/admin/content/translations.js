import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Translations');
  },

  model() {
    return [
      {
        code      : 'en',
        sourceUrl : '#'
      }
    ];
  }
});
