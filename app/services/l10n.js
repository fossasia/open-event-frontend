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
      'zh_Hans' : '中文（简体)',
      'zh_Hant' : '中文（繁體)',
      'de'      : 'Deutsch',
      'en'      : 'English',
      'es'      : 'Español',
      'fr'      : 'Français',
      'hi'      : 'हिंदी',
      'id'      : 'Bahasa Indonesia',
      'ja'      : '日本語',
      'ko'      : '한국어',
      'pl'      : 'Polski',
      'ru'      : 'Русский',
      'th'      : 'ไทย',
      'vi'      : 'Tiếng Việt'
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
