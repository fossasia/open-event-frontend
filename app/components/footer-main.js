import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { sortBy } from 'lodash-es';

@classic
@tagName('footer')
@classNames('ui', 'inverted', 'vertical', 'footer', 'segment', 'mt-16')
export default class FooterMain extends Component {

  @service cache;

  @filterBy('pages', 'place', 'footer')
  footerPages;

  @computed
  get currentLocale() {
    return this.l10n.getLocale();
  }

  @action
  switchLanguage(locale) {
    this.l10n.switchLanguage(locale);
  }

  async didInsertElement() {
    this.set('pages', sortBy((await this.cache.query('pages', 'page', { public: true })).toArray(), 'index'));
  }
}
