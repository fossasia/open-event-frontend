import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class PagesRoute extends Route {
  // Enumerate possible page names for extraction for localization
  pages() {
    return [this.l10n.t('Terms'), this.l10n.t('Contact'), this.l10n.t('Refund Policy'), this.l10n.t('Privacy')];
  }

  titleToken(model) {
    return this.l10n.tVar(model?.name) || this.l10n.t('Pages');
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
