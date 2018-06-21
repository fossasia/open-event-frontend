import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName       : 'footer',
  classNames    : ['ui', 'inverted', 'vertical', 'footer', 'segment'],
  places        : ['India', 'Singapore', 'Berlin', 'New York', 'Hong Kong'], 
  currentLocale : computed(function() {
    return this.get('l10n').getLocale();
  }),
  init() {
    this._super(...arguments);
    this.set('events', this.store.findAll('event-type'));
  },
  actions: {
    switchLanguage(locale) {
      this.get('l10n').switchLanguage(locale);
    }
  }
});
