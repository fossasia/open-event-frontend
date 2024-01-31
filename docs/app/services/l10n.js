import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import computed from 'ember-computed';
import L10n from 'ember-l10n/services/l10n';
import moment from 'moment-timezone';
import { getScript } from 'open-event-frontend/utils/loader';

@classic
export default class L10nService extends L10n {
  @service
  cookies;

  @service
  fastboot;

  @computed(function() {
    return {
      'ar'      : 'عربي',
      'bn'      : 'বাংলা',
      'ca'      : 'Català',
      'de'      : 'Deutsch',
      'en'      : 'English',
      'es'      : 'Español',
      'fr'      : 'Français',
      'hi'      : 'हिंदी',
      'hr'      : 'Hrvatski',
      'id'      : 'Bahasa Indonesia',
      'ja'      : '日本語',
      'ko'      : '한국어',
      'nb_NO'   : 'Norsk bokmål',
      'pl'      : 'Polski',
      'ru'      : 'Русский',
      'sv'      : 'Svenska',
      'te'      : 'తెలుగు',
      'th'      : 'ไทย',
      'vi'      : 'Tiếng Việt',
      'zh_Hans' : '中文（简体)',
      'zh_Hant' : '中文（繁體)'
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

      if (locale === 'zh_Hans') {
        locale = 'zh-cn';
      } else if (locale === 'zh_Hant') {
        locale = 'zh-tw';
      } else if (locale === 'nb_NO') {
        locale = 'nb';
      }

      getScript(`/assets/moment-locales/${locale}.js`)
        .then(() => {
          moment.locale(locale);
        });
    }
  }
}
