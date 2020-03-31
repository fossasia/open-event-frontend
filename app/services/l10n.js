import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import computed from 'ember-computed';
import L10n from 'ember-l10n/services/l10n';

@classic
export default class L10nService extends L10n {
  @service
  cookies;

  @service
  fastboot;

  @computed(function() {
    return {
      'bn'      : this.t('Bengali/Bangla'),
      'zh_Hans' : this.t('Chinese (Simplified)'),
      'zh_Hant' : this.t('Chinese (Traditional)'),
      'en'      : this.t('English'),
      'fr'      : this.t('French'),
      'de'      : this.t('German'),
      'id'      : this.t('Indonesian'),
      'ko'      : this.t('Korean'),
      'pl'      : this.t('Polish'),
      'es'      : this.t('Spanish'),
      'th'      : this.t('Thai'),
      'vi'      : this.t('Vietnamese'),
      'hi'      : this.t('Hindi'),
      'ja'      : this.t('Japanese'),
      'ru'      : this.t('Russian')
    };
  })
  availableLocales;

  localStorageKey = 'current_locale';
  autoInitialize = false;
  jsonPath = '/assets/locales';

  switchLanguage(locale) {
    this.setLocale(locale);
    this.cookies.write(this.localStorageKey, locale);
    if (!this.fastboot.isFastBoot) {
      location.reload();
    }
  }

  init() {
    super.init(...arguments);
    const currentLocale = this.cookies.read(this.localStorageKey);
    const detectedLocale = this.detectLocale();
    if (currentLocale) {
      this.setLocale(currentLocale);
    } else if (detectedLocale) {
      this.setLocale(detectedLocale);
    } else {
      this.setLocale('en');
    }
  }
}
