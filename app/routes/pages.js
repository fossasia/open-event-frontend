import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class PagesRoute extends Route {
  titleToken(model) {
    return model?.name || this.l10n.t('Pages');
  }

  model(params) {
    return this.modelFor('application').pages.findBy('url', params.path);
  }

  renderTemplate(model) {
    if (model.model) {
      this.render('pages');
    } else {
      this.render('not-found');
    }
  }
}
