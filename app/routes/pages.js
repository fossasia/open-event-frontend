import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
export default class PagesRoute extends Route {

  @service cache;

  // Enumerate possible page names for extraction for localization
  pages() {
    return [this.l10n.t('Terms'), this.l10n.t('Contact'), this.l10n.t('Refund Policy'), this.l10n.t('Privacy')];
  }

  titleToken(model) {
    return this.l10n.tVar(model?.name) || this.l10n.t('Pages');
  }

  async model(params) {
    return (await this.cache.query('pages', 'page', { public: true })).toArray().findBy('url', params.path);
  }

  renderTemplate(model) {
    if (model.model) {
      this.render('pages');
    } else {
      this.render('not-found');
    }
  }
}
