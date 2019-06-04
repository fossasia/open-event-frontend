import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Import');
  },
  async model() {

    const data = await this.store.findAll('importJob');

    return {
      data,
      objectType: 'importJob'
    };
  }
});
