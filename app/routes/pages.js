import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Pages');
  },
  model(params) {
    return this.modelFor('application').pages.findBy('url', params.path);
  },
  renderTemplate(model) {
    if (model.model) {
      this.render('pages');
    } else {
      this.render('not-found');
    }
  }
});
