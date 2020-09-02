import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class TranslationsRoute extends Route {
  titleToken() {
    return this.l10n.t('Translations');
  }

  model() {
    return [
      {
        code      : 'en',
        sourceUrl : '#'
      }
    ];
  }
}
