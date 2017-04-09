import computed from 'ember-computed';
import L10n from 'ember-l10n/services/l10n';
// import l10nFingerprintMap from './../utils/l10n-fingerprint-map';

export default L10n.extend({

  availableLocales: computed(function() {
    return {
      'en': this.t('en')
    };
  }),

  autoInitialize: true,

  jsonPath: '/assets/locales',

  // Make this return null if you do not want to use fingerprinting
  fingerprintMap: null
});
