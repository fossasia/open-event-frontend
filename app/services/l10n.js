import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import computed from 'ember-computed';
import L10n from 'ember-l10n/services/l10n';
import moment from 'moment';
import { getScript } from 'open-event-frontend/utils/loader';

@classic
export default class L10nService extends L10n {
  @service
  cookies;

  @service
  fastboot;

  @computed(function() {
    return {
      'bn'      : 'বাংলা',
      'de'      : 'Deutsch',
      'en'      : 'English',
      'es'      : 'Español',
      'fr'      : 'Français',
      'hi'      : 'हिंदी',
      'id'      : 'Bahasa Indonesia',
      'ja'      : '日本語',
      'pl'      : 'Polski',
      'ru'      : 'Русский',
      'th'      : 'ไทย',
      'vi'      : 'Tiếng Việt',
      'zh_Hans' : '中文（简体)',
      'zh_Hant' : '中文（繁體)',
      'ko'      : '한국어'
    };
  })
  availableLocales;

  localStorageKey = 'current_locale';
  autoInitialize = false;
  jsonPath = '/assets/locales';

  switchLanguage(locale, skipRefresh) {
    if (this.locale === locale) {return}
    this.setLocale(locale);
    this.cookies.write(this.localStorageKey, locale, { path: '/' });
    if (!this.fastboot.isFastBoot && !skipRefresh) {
      location.reload();
    }
  }

  detectQueryLang() {
    const params = new URLSearchParams(location.search);
    const locale = params.get('lang');
    if (!locale || !Object.keys(this.availableLocales).includes(locale)) {return}
    this.switchLanguage(locale, true);
  }

  init() {
    super.init(...arguments);
    this.detectQueryLang();
    const currentLocale = this.cookies.read(this.localStorageKey);
    const detectedLocale = this.detectLocale();

    let locale = 'en';
    if (currentLocale) {
      locale = currentLocale;
    } else if (detectedLocale) {
      locale = detectedLocale;
    }

    this.setLocale(locale);
    if (locale !== 'en') {
      getScript(`/assets/moment-locales/${locale}.js`)
        .then(() => {
          moment.locale(locale);
        });
    }
  }
}
