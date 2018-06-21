import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName       : 'footer',
  classNames    : ['ui', 'inverted', 'vertical', 'footer', 'segment'],
  events        : ['Appearance or Signing', 'Attraction', 'Camp, Trip, or Retreat', 'Class, Training, or Workshop', 'Concert or Performance', 'Conference', 'Convention', 'Dinner or Gala', 'Festival or Fair', 'Game or Competition'],
  places        : ['India', 'Singapore', 'Berlin', 'New York', 'Hong Kong'],
  currentLocale : computed(function() {
    return this.get('l10n').getLocale();
  }),
  actions: {
    switchLanguage(locale) {
      this.get('l10n').switchLanguage(locale);
    }
  }
});
