import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName       : 'footer',
  classNames    : ['ui', 'inverted', 'vertical', 'footer', 'segment'],
  currentLocale : computed(function() {
    return this.l10n.getLocale();
  }),
  actions: {
    switchLanguage(locale) {
      this.l10n.switchLanguage(locale);
    }
  },

  didInsertElement() {
    this.set('eventLocations', this.eventLocations.sortBy('name'));

    let eventTypes = this.eventTypes.sortBy('name').toArray();
    eventTypes.forEach(eventType => {
      if (eventType.name === 'Other') {
        let other = eventType;
        eventTypes.splice(eventTypes.indexOf(eventType), 1);
        eventTypes.push(other);
      }
    });
    this.set('eventTypes', eventTypes);
  }
});
