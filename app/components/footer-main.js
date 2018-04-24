import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName    : 'footer',
  classNames : ['ui', 'inverted', 'vertical', 'footer', 'segment'],

  currentLocale: computed(function() {
    return this.get('l10n').getLocale();
  }),

  actions: {
    switchLanguage(locale) {
      this.get('l10n').switchLanguage(locale);
    }
  }
});
