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
      'bn'      : this.t('বাংলা'),
      'zh_Hans' : this.t('中文 (简化版)'),
      'zh_Hant' : this.t('中文 (傳統的)'),
      'en'      : this.t('English'),
      'fr'      : this.t('français'),
      'de'      : this.t('Deutsche'),
      'id'      : this.t('bahasa Indonesia'),
      'ko'      : this.t('한국어'),
      'pl'      : this.t('Polskie'),
      'es'      : this.t('Español'),
      'th'      : this.t('ไทย'),
      'vi'      : this.t('Tiếng Việt'),
      'hi'      : this.t('हिंदी'),
      'ja'      : this.t('日本語'),
      'ru'      : this.t('русский')
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
