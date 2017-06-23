import computed from 'ember-computed';
import L10n from 'ember-l10n/services/l10n';
import l10nFingerprintMap from './../utils/l10n-fingerprint-map';

export default L10n.extend({

  availableLocales: computed(function() {
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
  }),

  localStorageKey: 'current_locale',

  autoInitialize: false,

  jsonPath: '/assets/locales',

  // Make this return null if you do not want to use fingerprinting
  fingerprintMap: l10nFingerprintMap,

  switchLanguage(locale) {
    this.setLocale(locale);
    localStorage.setItem(this.localStorageKey, locale);
    location.reload();
  },

  init() {
    this._super(...arguments);
    const currentLocale = localStorage.getItem(this.localStorageKey);
    const detectedLocale = this.detectLocale();
    if (currentLocale) {
      this.setLocale(currentLocale);
    } else if (detectedLocale) {
      this.setLocale(detectedLocale);
    } else {
      this.setLocale('en');
    }
  }
});
