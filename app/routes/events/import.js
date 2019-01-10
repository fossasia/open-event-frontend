import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Import');
  },
  async model() {

    const data = await this.get('store').findAll('importJob');

    return {
      data,
      objectType: 'importJob'
    };
  }
});
