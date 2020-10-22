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
      'bn'      : 'বাংলা',
      'zh_Hans' : '中文 (简化版)',
      'zh_Hant' : '中文 (傳統的)',
      'en'      : 'English',
      'fr'      : 'français',
      'de'      : 'Deutsche',
      'id'      : 'bahasa Indonesia',
      'ko'      : '한국어',
      'pl'      : 'Polskie',
      'es'      : 'Español',
      'th'      : 'ไทย',
      'vi'      : 'Tiếng Việt',
      'hi'      : 'हिंदी',
      'ja'      : '日本語',
      'ru'      : 'русский'
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
